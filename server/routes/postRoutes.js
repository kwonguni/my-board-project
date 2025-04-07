// 게시판 API 라우트
const express = require("express");
const router = express.Router();
const postModel = require("../models/postModel");

router.get("/test", (req, res) => {
    console.log("✅ [서버] /api/posts/test 요청 받음!");
    res.json({ message: "서버 정상 작동 중!" });
});

// 모든 게시글 조회
router.get("/", (req, res) => {
    console.log("✅ GET 요청 받음!", req.query); // GET 요청이므로 req.query 확인
    debugger;
    postModel.getAllPosts((err, results) => {
        if(err) return res.status(500).json({error: "DB 오류 발생"});
        res.json(results);
    });
});

// 게시글 추가
router.post("/", (req, res) => {
    console.log("✅ POST 요청 받음!", req.body); // 요청 데이터 확인용 로그
    debugger;
    const {title, content} = req.body;
    debugger;
    postModel.createPost(title, content, (err, result) => {
        if(err) return res.status(500).json({error: "DB 오류 발생"});
        res.json({id: result.insertId, title, content});
    });
});

// 게시글 수정
router.put("/:id", (req, res) => {
    console.log("✅ PUT 요청 받음!", req.body); // 요청 데이터 확인용 로그
    const {title, content} = req.body;
    const {id} = req.params;

    postModel.updatePost(id, title, content, (err, result) => {
        if(err) return res.status(500).json({error: "DB 오류 발생"});
        res.json({message: "게시글 수정 완료!"});
    });
});

// 게시글 삭제
router.delete("/:id", (req, res) => {
    console.log("✅ DELETE 요청 받음!", req.params); // 요청 데이터 확인용 로그
    const {id} = req.params;

    postModel.deletePost(id, (err, result) => {
        if(err) return res.status(500).json({error: "DB 오류 발생"});
        res.json({message: "게시글 삭제 완료!"});
    });
});

module.exports = router;