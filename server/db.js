const mysql = require("mysql2");
const dotenv = require("dotenv");   

dotenv.config();    // dotenv.config() → .env 파일에서 환경 변수 로드

// MySQL 연결 설정
const db = mysql.createConnection({
    host: process.env.DB_HOST || "127.0.0.1",
    user: process.env.DB_USER || "bd_mngr",
    password: process.env.DB_PASS || "q1w2e3r4t%",
    database: process.env.DB_NAME || "board_db"
});

db.connect(err => {
    if(err) {
        console.log("MySQL 연결 오류:", err);
        return;
    }
    console.log("MySQL 연결 성공!");
});

module.exports = db;    // 다른 파일에서 사용 가능하도록 내보내기