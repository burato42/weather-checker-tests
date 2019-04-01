module.exports = {
    match: function (datetime) {
        const dataRegex = /^(\d{2}\/){2}\d{4} (\d{2}:){2}\d{2}$/g;
        return dataRegex.test(datetime);
    }
}
