// 게시판 관련 데이터 처리
// db.query() -> MySQL 쿼리 실행
// callback -> SQL 실행 결과를 함수로 전달
const db = require("../db");    // MySQL 연결 정보 가져오기

// 모든 게시글 조회
exports.getAllPosts = (callback) => {
    db.query("SELECT * FROM posts ORDER BY created_at DESC")
};

// 게시글 추가
exports.createPost = (title, content, callback) => {
    db.query("INSERT INTO posts (title, content) VALUES (?, ?)", [titile, content], callback);
};

// 게시글 수정
exports.updatePost = (id, title, content, callback) => {
    db.query("UPDATE posts SET title = ?, content = ? WHERE id = ?", [title, content, id], callback);
};

// 게시글 삭제
exports.deletePost = (id, callback) => {
    db.query("DELETE FROM posts WHERE id = ?", [id], callback);
};