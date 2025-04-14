// 게시판 관련 데이터 처리
// db.query() -> MySQL 쿼리 실행
// callback -> SQL 실행 결과를 함수로 전달
const db = require("../db");    // MySQL 연결 정보 가져오기

// 모든 게시글 조회
exports.getAllPosts = async () => {
    const query = "SELECT * FROM board_db.posts ORDER BY created_at DESC";
    console.log(`📝 [getAllPosts] 실행할 쿼리: ${query}`);
    const [results] = await db.query(query);
    console.log("✅ [getAllPosts] 조회 결과:", results.length, "건");
    return results;
};

// 전체 게시글 수
exports.getTotalPostCount = async () => {
    const query = "SELECT COUNT(1) as count FROM board_db.posts";
    console.log(`📝 [getTotalPostCount] 실행할 쿼리: ${query}`);
    const [rows] = await db.query(query);
    console.log("✅ [getTotalPostCount] 조회 결과:", rows, "건");
    return rows[0].count;
};

// 모든 게시글 조회(페이지네이션)
exports.getPostsWithPagination = async (page, size) => {
    const offset = (page -1) * size;
    const query = "SELECT * FROM board_db.posts ORDER BY created_at DESC LIMIT ? OFFSET ?";
    console.log(`📝 [getPostsWithPagination] 쿼리: ${query} | 파라미터: [${size}, ${offset}]`);
    const [results] = await db.query(query, [size, offset]);
    console.log("✅ [getPostsWithPagination] 조회 결과:", results.length, "건");
    return results;
};

// 게시글 상세
exports.getPost = async (id) => {
    const query = "SELECT * FROM board_db.posts WHERE id = ?";
    console.log(`📝 [getPost] 실행할 쿼리: ${query} | 파라미터: [${id}]`);
    const [results] = await db.query(query, [id]);
    console.log("✅ [getPost] 조회 결과:", results); // ✅ 실행 결과 출력
    return results;
    // db.query(query, [id], (err, results) => {
    //     if (err) {
    //         console.error("❌ 쿼리 실행 오류:", err); // ✅ 실행 오류 출력
    //         return callback(err, null);
    //     }
    //     console.log("✅ 쿼리 실행 결과:", results); // ✅ 실행 결과 출력
    //     callback(null, results);
    // });
};

// 게시글 추가
exports.createPost = async (title, content, author) => {
    const query = "INSERT INTO board_db.posts (title, content, author) VALUES (?, ?, ?)";
    console.log(`📝 [createPost] 실행할 쿼리: ${query} | 파라미터: [${title}, ${content}, ${author}]`);
    const [result] = await db.query(query, [title, content, author]);
    console.log("✅ [createPost] 게시글 추가 완료! ID:", result.insertId);
    return result.insertId;
    // db.query(query, [title, content, author], (err, result) => {
    //     if (err) {
    //         console.error("❌ [createPost] 쿼리 실행 오류:", err);
    //         return callback(err, null);
    //     }
    //     console.log("✅ [createPost] 게시글 추가 완료! ID:", result.insertId);
    //     callback(null, result);
    // });
};

// 게시글 수정
exports.updatePost = async (id, title, content) => {
    const query = "UPDATE board_db.posts SET title = ?, content = ? WHERE id = ?";
    console.log(`📝 실행할 쿼리: ${query} | 파라미터: [${title}, ${content}, ${id}]`);
    const [result] = await db.query(query, [id, title, content]);
    console.log("✅ [updatePost] 수정 완료! 변경된 행 수:", result.affectedRows);
    return result.affectedRows > 0;

    // db.query(query, [title, content, id], (err, result) => {
    //     if (err) {
    //         console.error("❌ [updatePost] 쿼리 실행 오류:", err);
    //         return callback(err, null);
    //     }
    //     console.log("✅ [updatePost] 수정 완료! 변경된 행 수:", result.affectedRows);
    //     callback(null, result);
    // });
};

// 게시글 삭제
exports.deletePost = async (id) => {
    const query = "DELETE FROM board_db.posts WHERE id = ?";
    console.log(`📝 [deletePost] 실행할 쿼리: ${query} | 파라미터: [${id}]`);
    const [result] = await db.query(query, [id]);
    console.log("✅ [deletePost] 삭제 완료! 삭제된 행 수:", result.affectedRows);
    return db.affectedRows > 0;

    // db.query(query, [id], (err, result) => {
    //     if (err) {
    //         console.error("❌ [deletePost] 쿼리 실행 오류:", err);
    //         return callback(err, null);
    //     }
    //     console.log("✅ [deletePost] 삭제 완료! 삭제된 행 수:", result.affectedRows);
    //     callback(null, result);
    // });
};