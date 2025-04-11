// 댓글 : async/await 방식 
const db = require("../db");    // MySQL 연결 정보 가져오기

exports.createComment = async (postId, author, content) => {
    const query = "INSERT INTO board_db.comments (postId, author, content) VALUES (?, ?, ?)";
    const [result] = await db.query(query, [postId, author, content]);
    
    const subQuery = "SELECT * FROM board_db.comments WHERE id = ?";
    const [rows] = await db.query(subQuery, [result.insertId]);
    return rows[0]; // 결과의 첫 번째 댓글 객체 반환
};

exports.getComments = async (postId) => {
    const query = "SELECT * FROM board_db.comments WHERE post_id = ? ORDER BY created_at ASC";
    console.log(`📝 실행할 쿼리: ${query}`);  // ✅ 실행할 쿼리 출력
    const [comments] = await db.query(query, [postId]);
    return comments;
};