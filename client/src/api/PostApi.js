// 게시글 API
import axios from "axios";

const API_URL = "http://localhost:5000/api/posts";

// 모든 게시글 가져오기
export const getPosts = async () => {
    const response = await axios.get(API_URL);
    return response.data;
}

// 게시글 추가
export const createPost = async (title, content) => {
    const response = await axios.post(API_URL, {title, content});
    return response.data;
};

// 게시글 수정
export const updatePost = async (id, title, content) => {
    const response = await axios.put(`${API_URL}/${id}`, {title, content});
    return response.data;
};

// 게시글 삭제
export const deletePost = async (id) => {
    await axios.delete(`${API_URL}/${id}`);
}
