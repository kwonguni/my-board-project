// 게시글 API
import axios from "axios";

const API_URL = "http://localhost:5000/api/posts";

// 모든 게시글 가져오기
export const getPosts = async () => {
    console.log("✅ getPosts() 실행됨!");  // 요청 시작 로그
    try {
        // console.log(`🔍 요청 보낼 URL: ${API_URL}`);  // API_URL 확인
        const response = await axios.get(API_URL);
        return response.data;
    } catch (error) {
        console.error("❌ getPosts() 오류:", error);
        return [];
    }
}

// 게시글 추가
export const createPost = async (title, content) => {
    try {
        const response = await axios.post(API_URL, {title, content});
        return response.data;
    } catch (error) {
        console.error("❌ createPost() 오류:", error);
        return [];
    }   
};

// 게시글 수정
export const updatePost = async (id, title, content) => {
    try {
        const response = await axios.put(`${API_URL}/${id}`, {title, content});
        return response.data;
    } catch (error) {
        console.error("❌ updatePost() 오류:", error);
        return [];
    }  
};

// 게시글 삭제
export const deletePost = async (id) => {
    try {
        await axios.delete(`${API_URL}/${id}`);
    } catch (error) {
        console.error("❌ deletePost() 오류:", error);
        return [];
    }  
}
