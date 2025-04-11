// 게시판 API 라우트
const express = require("express");
const router = express.Router();
const postModel = require("../models/postModel");

router.get("/test", (req, res) => {
    console.log("✅ [서버] /api/posts/test 요청 받음!");
    res.json({ message: "서버 정상 작동 중!" });
});

// 모든 게시글 조회
router.get("/", async (req, res) => {
    console.log("✅ GET 요청 받음!", req.query); // GET 요청이므로 req.query 확인
    try {
        const posts = await postModel.getAllPosts();
        res.json(posts);
    } catch (error) {
        console.error("❌ DB 오류:", error);
        res.status(500).json({ error: "DB 오류 발생" });
    }
});

// 게시글 상세 조회
router.get("/:id", async (req, res) => {
    const {id} = req.params;
    console.log(`✅ [GET /:id] 게시글 상세 요청 받음 | ID: ${id}`);
    try {
        const results = await postModel.getPost(id);
        res.json(results[0]);
    } catch (error) {
        console.error("❌ 게시글 상세 조회 중 오류:", error);
        res.status(500).json({ error: "DB 오류 발생" });
    }
});

// 게시글 추가
router.post("/", async (req, res) => {
    const {title, content, author} = req.body;
    console.log("✅ [POST /] 게시글 추가 요청 받음:", req.body);
    
    try {
        const resultt = await postModel.createPost(title, content, author);
        res.json({id: result.insertId, title, content});
    } catch (error) {
        console.error("❌ 게시글 등록 중 오류:", error);
        res.status(500).json({error: "DB 오류 발생"});
    }
});

// 게시글 수정
router.put("/:id", async (req, res) => {
    const {title, content} = req.body;
    const {id} = req.params;
    console.log(`✅ [PUT /:id] 게시글 수정 요청 받음 | ID: ${id}`, req.body);

    try {
        const result = await postModel.updatePost(id, title, content);
        res.json({message: "게시글 수정 완료!"});
    } catch (error) {
        console.error("❌ 게시글 수정 중 오류:", error);
        res.status(500).json({error: "DB 오류 발생"});
    }
});

// 게시글 삭제
router.delete("/:id", async (req, res) => {
    const {id} = req.params;
    console.log(`✅ [DELETE /:id] 게시글 삭제 요청 받음 | ID: ${id}`);

    try {
        const result = await postModel.deletePost(id);
        res.json({message: "게시글 삭제 완료!"});
    } catch (error) {
        console.error("❌ 게시글 삭제 중 오류:", error);
        res.status(500).json({error: "DB 오류 발생"});
    }
});

module.exports = router;