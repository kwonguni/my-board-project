// async/await(Promise) 기반
require('dotenv').config({ path: __dirname + '/.env' });    // dotenv.config() → .env 파일에서 환경 변수 로드
const mysql = require('mysql2/promise');

console.log("✅ 환경 변수 확인:", process.env);

// MySQL 연결 설정
const dbConfig = {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
};

// 커넥션 풀 생성
const pool = mysql.createPool(dbConfig);

// 연결 테스트
(async () => {
    try {
        const connection = await pool.getConnection();
        console.log("✅ MySQL 연결 성공");
        connection.release(); // 연결 해제
    } catch (error) {
        console.error("❌ MySQL 연결 실패:", error);
    }
})();

// 콜백 방식 호환을 위한 query 함수 추가
const query = async (sql, params, callback) => {
    try {
        const [rows] = await pool.query(sql, params);
        if(callback) {
            callback(null, rows);
        } else {
            return [rows];  // async/await용 사용자는 이걸 return 받음
        }
    } catch (error) {
        if(callback) {
            callback(error, null);
        } else {
            throw error;
        }
    }
};

module.exports = { query, pool };