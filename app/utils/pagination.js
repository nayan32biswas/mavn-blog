const { PAGE_SIZE } = require("../keys");

exports.pagination = (page, PAGE_SIZE, count, URL) => {
    const prev_page = page == 0 ? null : `${URL}?page=${page - 1}`;
    const next_page = count < PAGE_SIZE ? null : `${URL}?page=${page + 1}`;
    return { page, pageSize: count, prev_page, next_page };
}