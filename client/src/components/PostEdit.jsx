import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { usePostDispatch } from "../context/PostContext";

const PostEdit = () => {
    const {id} = useParams();
    const navigate = useNavigate();
    const dispatch = usePostDispatch();
    const [post, setPost] = useState({title: "", author: "", content: ""});

    useEffect(() => {
        const fetchPost = async () => {
            const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/api/posts/${id}`);
            const data = await response.json();
            setPost(data);
        };
        fetchPost();
    }, [id]);

    const handleChange = (e) => {
        setPost({...post, [e.target.name]: e.target.value});
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/api/posts/${id}`, {
               method: "PUT",
               headers: {
                 "Content-Type": "application/json",
               },
               body: JSON.stringify(post),
            });
            const updatePost = await response.json();
            dispatch({type: "UPDATE_POST", payload: updatePost});
            alert("수정 완료");
            navigate(`/detail/${id}`);
        } catch (error) {
            console.error("수정 실패:", error);
        }
    };

    return (
        <div className="p-4">
            <h2 className="text-xl font-bold mb-4">게시글 수정</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <input type="text" name="title" className="w-full border p-2 rounded" placeholder="제목" value={post.title} onChange={handleChange} />
                <input type="text" name="author" className="w-full border p-2 rounded" placeholder="작성자" value={post.author} onChange={handleChange} />
                <textarea name="content" className="w-full border p-2 rounded h-40" placeholder="내용" value={post.content} onChange={handleChange} />
                <button type="submit" className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600">
                    수정하기
                </button>
            </form>
        </div>
    );
};

export default PostEdit;