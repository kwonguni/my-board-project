// 게시판 관련 데이터 처리
// db.query() -> MySQL 쿼리 실행
// callback -> SQL 실행 결과를 함수로 전달
const db = require("../db");    // MySQL 연결 정보 가져오기

// 모든 게시글 조회
exports.getAllPosts = (callback) => {
    const query = "SELECT * FROM board_db.posts ORDER BY created_at DESC";
    console.log(`📝 실행할 쿼리: ${query}`);  // ✅ 실행할 쿼리 출력

    db.query(query, (err, results) => {
        if (err) {
            console.error("❌ 쿼리 실행 오류:", err); // ✅ 실행 오류 출력
            return callback(err, null);
        }
        console.log("✅ 쿼리 실행 결과:", results); // ✅ 실행 결과 출력
        callback(null, results);
    });
};

// 게시글 추가
exports.createPost = (title, content, callback) => {
    const query = "INSERT INTO posts (title, content) VALUES (?, ?)";
    console.log(`📝 실행할 쿼리: ${query} | 파라미터: [${title}, ${content}]`);  // ✅ 실행할 쿼리 및 파라미터 출력
    db.query(query, [title, content], (err, result) => {
        if (err) {
            console.error("❌ 쿼리 실행 오류:", err); // ✅ 실행 오류 출력
            return callback(err, null);
        }
        console.log("✅ 게시글 추가 완료! ID:", result.insertId); // ✅ 실행 결과 출력
        callback(null, result);
    });
};

// 게시글 수정
exports.updatePost = (id, title, content, callback) => {
    const query = "UPDATE posts SET title = ?, content = ? WHERE id = ?";
    console.log(`📝 실행할 쿼리: ${query} | 파라미터: [${title}, ${content}, ${id}]`);

    db.query(query, [title, content, id], (err, result) => {
        if (err) {
            console.error("❌ 쿼리 실행 오류:", err);
            return callback(err, null);
        }
        console.log("✅ 게시글 수정 완료! 변경된 행 수:", result.affectedRows);
        callback(null, result);
    });
};

// 게시글 삭제
exports.deletePost = (id, callback) => {
    const query = "DELETE FROM posts WHERE id = ?";
    console.log(`📝 실행할 쿼리: ${query} | 파라미터: [${id}]`);

    db.query(query, [id], (err, result) => {
        if (err) {
            console.error("❌ 쿼리 실행 오류:", err);
            return callback(err, null);
        }
        console.log("✅ 게시글 삭제 완료! 삭제된 행 수:", result.affectedRows);
        callback(null, result);
    });
};