import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { usePostDispatch } from "../context/PostContext";

const PostCreate = () => {
    const[title, setTitle] = useState("");
    const[content, setContent] = useState("");
    const[author, setAuthor] = useState("");
    const navigate = useNavigate();
    const dispatch = usePostDispatch();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/api/posts`, {
                method: "POST",
                headers: { "Content-Type": "application/json"},
                body: JSON.stringify({title, content, author})
            });
            const newPost = await response.json();
            dispatch({type: "ADD_POST", payload: newPost});
            navigate("/");
        } catch (error) {
            console.error("작성 실패:", error);
        }
    };

    return (
        <div className="p-4">
            <h2 className="text-2xl font-bold mb-4">새 게시글 작성</h2>
            <form onSubmit={handleSubmit}>
                <input type="text" className="w-full p-2 border rounded" value={author}  placeholder="작성자" onChange={(e) => setAuthor(e.target.value)} />    
                <input type="text" className="w-full p-2 border rounded" placeholder="제목" value={title} onChange={(e) => setTitle(e.target.value)} />
                <textarea className="w-full p-2 border rounded h-40" placeholder="내용" value={content} onChange={(e) => setContent(e.target.value)} />
                <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded">작성하기</button>
            </form>
        </div>
    );
};

export default PostCreate;