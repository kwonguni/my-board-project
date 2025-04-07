// 서버 실행 파일
const express = require('express');
const cors = require('cors');
const db = require("./db");  // ✅ MySQL 연결 추가
const postRoutes = require("./routes/postRoutes");
console.log("📌 postRoutes 로드됨!");  // ✅ 추가

const corsOptions = {
    origin: "http://localhost:3000",
    methods: "GET,POST,PUT,DELETE",
    allowedHeaders: "Content-Type"
};

const app = express();
app.use(cors());
app.use(express.json());

app.use((req, res, next) => {
    console.log("server 진입!")
    console.log(`✅ ${req.method} 요청 받음! → ${req.url}`);
    if(req.method == "GET") {
        console.log(`✅ 요청 쿼리:`, req.query); // GET 요청 시 사용
    }
    else {
        console.log(`✅ 요청 바디:`, req.body);  // POST, PUT 요청 시 사용
    }
    next();
});

app.use("/api/posts", postRoutes);

app.listen(5000, () => {
    console.log("서버 실행 중: http://localhost:5000");
});