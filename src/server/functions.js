/* 様々な関数 */
const moment = require("moment");
const crypto = require("crypto");

//パスワードハッシュ化
exports.passwordHash = (password, time) => {
    let hash = crypto.createHash("sha512");
    let passwordHash = hash.update(password + time);
    passwordHash = passwordHash.digest("hex");
    let hash2 = crypto.createHash("sha512");
    let passwordHash2 = hash2.update(passwordHash);
    passwordHash2 = passwordHash2.digest("hex");
    return passwordHash2;
}

//Datetimeを取得
exports.getDatetime = (format) => {
    const date = moment();
    date.utcOffset("+0900");
    return date.format(format);
}

//datetime型をstgingに変換
exports.datetimeAtString = (datetimeObject, format) => {
    const monthList = {
        "Jan": "01",
        "Feb": "02",
        "Mar": "03",
        "Apr": "04",
        "May": "05",
        "Jun": "06",
        "Jul": "07",
        "Aug": "08",
        "Sep": "09",
        "Oct": "10",
        "Nov": "11",
        "Dec": "12"
    };
    let datetime = String(datetimeObject).split(" ");
    let time = datetime[4].split(":");
    let year = datetime[3];
    let month = monthList[datetime[1]];
    let day = datetime[2];
    let hours = time[0];
    let minutes = time[1];
    let seconds = time[2];
    format = format.replace("YYYY", year);
    format = format.replace("MM", month);
    format = format.replace("DD", day);
    format = format.replace("HH", hours);
    format = format.replace("mm", minutes);
    format = format.replace("ss", seconds);
    return format;
}