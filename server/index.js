// 서버 실행 파일
const express = require('express');
const cors = require('cors');
const postRoutes = require("./routes/postRoutes");

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/posts", postRoutes);

app.listen(5000, () => {
    console.log("서버 실행 중: http://localhost:5000");
});