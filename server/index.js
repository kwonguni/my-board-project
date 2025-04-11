// 서버 실행 파일
const express = require('express');
const cors = require('cors');
const postRoutes = require("./routes/postRoutes");
const commentRoutes = require("./routes/commentRoutes");
console.log("📌 postRoutes 로드됨!");  // ✅ 추가

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
app.use("/api", commentRoutes);

app.listen(5000, () => {
    console.log("서버 실행 중: http://localhost:5000");
});