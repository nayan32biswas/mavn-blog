const http = require("http");


const path = require("path");

const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const mongoose = require("mongoose");
const redis = require("redis");

const KEYS = require("./keys");
const userRoutes = require("./routes/user");
const postRoutes = require("./routes/posts");
const commentRoutes = require("./routes/comments");

const app = express();
app.use(cors());
app.use(morgan("dev")); //for debuging.
app.use("/media", express.static("media"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

/* block DB */
const {
    // MONGO_USERNAME,
    // MONGO_PASSWORD,
    MONGO_HOSTNAME,
    MONGO_PORT,
    MONGO_DB
} = KEYS.DATABASE;
const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true, useCreateIndex: true,
    reconnectTries: Number.MAX_VALUE,
    reconnectInterval: 500,
    connectTimeoutMS: 10000,
};
// const url = `mongodb://${MONGO_USERNAME}:${MONGO_PASSWORD}@${MONGO_HOSTNAME}:${MONGO_PORT}/${MONGO_DB}?authSource=admin`; // Remote connection.
const url = `mongodb://${MONGO_HOSTNAME}:${MONGO_PORT}/${MONGO_DB}?authSource=admin`;
mongoose.connect(url, options).then(function () {
    console.log('\n\nMongoDB is connected\n\n');
}).catch(function (err) {
    console.log("\n\n", err, "\n\n");
});
// endblock DB





// block Redis
const client = redis.createClient({
    host: "redis-server",
    port: 6379
});
client.set("visits", 0);
app.get("/redis", (req, res) => {
    client.get("visits", (error, visits) => {
        res.status(200).json("Number of visits is " + visits);
        client.set("visits", parseInt(visits) + 1);
    });
});
// endblock Redis

app.use("/api/auth", userRoutes);
app.use("/api/posts", postRoutes);
app.use("/api/comments", commentRoutes);

// block frontend
// app.use(express.static("../frontend/buidl"));
app.use(express.static(path.join(__dirname, "../frontend", "build",)));
app.get("*", (req, res) => { res.sendFile(path.resolve(__dirname, "../frontend", "build", "index.html")); });
// endblock frontend

// Error handler
app.use((req, res, next) => {
    const error = new Error("Not found.");
    error.status = 404;
    next(error);
});
app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message
        }
    })
});


const port = process.PORT || 8000

const server = http.createServer(app);

server.listen(port);