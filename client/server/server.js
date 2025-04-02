const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
    host: '127.0.0.1',
    user: 'bd_mngr',
    password: 'q1w2e3r4t%',
    database: 'board_db'
});

db.connect((err) => {
    if (err) {
        console.error('MySQL 연결 오류:', err);
    } else {
        console.log('MySQL 연결 성공');
    }
});

app.get('/', (req, res) => {
    res.send('서버 실행 중!');
});

app.listen(5000, () => {
    console.log('서버가 5000번 포트에서 실행 중');
});