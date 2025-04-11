const express = require("express");
const router = express.Router();
const commentModel = require("../models/commentModel");

// 댓글 등록
router.post("/posts/:postId/comments", async (req, res) => {
    const {postId} = req.params;
    const {author, content} = req.body;

    try {
        const newComment = await commentModel.createComment(postId, author, content);
        res.status(200).json(newComment);    
    } catch (error) {
        console.error("댓글 등록 실패", error);
        res.status(500).json({error: "댓글 등록 실패"});
    }
});

// 댓글 조회
router.get("/posts/:postId/comments", async (req, res) => {
    const {postId} = req.params;
    try {
        const comments = await commentModel.getComments(postId);
        res.json(comments);
    } catch (error) {
        console.error("댓글 조회 실패", error);
        res.status(500).json({error: "댓글 조회 실패"});
    }
});

module.exports = router;