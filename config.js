var port = process.env.PORT || (process.argv[2] || 5000);
module.exports = {
    port: (typeof port === "number") ? port : 5000
};
