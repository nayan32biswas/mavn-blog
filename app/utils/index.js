const isValidData = (data) => (data || data === 0 || data === false);

exports.slugify = (str) => str.toLowerCase().replace(/[^A-Z0-9]+/ig, "-");
exports.username = (str) => str.toLowerCase().replace(/[^A-Z0-9]+/ig, "");

exports.extract = (source, fields = [], result = {}) => {
    var temp;
    fields.forEach((key) => {
        temp = source[key];
        if (isValidData(temp)) {
            result[key] = temp;
        }
    });
    return result;
}