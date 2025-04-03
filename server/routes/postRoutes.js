// 게시판 API 라우트
const express = require("express");
const router = express.Router();
const postModel = require("../models/postModel");

// 모든 게시글 조회
router.get("/", (req, res) => {
    postModel.getAllPosts((err, results) => {
        if(err) return res.status(500).json({error: "DB 오류 발생"});
        res.json(results);
    });
});

// 게시글 추가
router.post("/", (req, res) => {
    const {title, content} = req.body;
    postModel.createPost(title, content, (err, result) => {
        if(err) return res.status(500).json({error: "DB 오류 발생"});
        res.json({id: result.insertId, title, content});
    });
});

module.exports = router;