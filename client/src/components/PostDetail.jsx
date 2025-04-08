import React, { useEffect, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom"; 
import { usePostDispatch } from "../context/PostContext";

const PostDetail = () => {
    const {id} = useParams();
    const navigate = useNavigate();
    const dispatch = usePostDispatch();
    const [post, setPost] = useState(null);
    const [loading, setLoading] = useState(true);

    // useEffect(() => {
    //    axios.get(`http://localhost:3001/pots/${id}`)
    //    .then(res => setPost(res.data))
    //    .catch(err => console.error(err));
    // }, [id]);
    
    useEffect(() => {

        const fetchPost = async() => {
            try {
                const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/api/posts/${id}`);
                if(!response.ok) {
                    throw new Error('게시글을 찾을 수 없습니다.');
                }
                const data = await response.json();
                setPost(data[0]);
            } catch(error) {
                console.error(error);
                setPost(null);
            } finally {
                setLoading(false);
            }
        };
        
        fetchPost();
    }, [id]);
    
    const handleDelete = async () => {
        if(window.confirm("정말 삭제하시겠습니까?")) {
            try {
                await fetch(`${process.env.REACT_APP_API_BASE_URL}/api/posts/${id}`, {
                    method: "DELETE"
                });
                dispatch({type: "DELETE_POST", payload: parseInt(id)});
                alert("삭제되었습니다.")
                navigate("/");
            } catch(error) {
                console.error("삭제 실패:", error);
            }
        }
    };

    if(loading) return <div>로딩중...</div>
    if(!post) return <div className="p-4">게시글을 찾을 수 없습니다.</div>;

    return (
        <div className="p-4">
            <h2 className="text-2xl font-bold mb-2">{post.title}</h2>
            <p className="text-gray-600 mb-4">{post.author}</p>
            <div className="text-base mb-6">{post.content}</div>

            <div className="flex space-x-4">
                <Link to={`/posts/${post.id}/edit`} className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
                    수정
                </Link>
                <button onClick={handleDelete} className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600">
                    삭제
                </button>
            </div>
        </div>
    );
};    

export default PostDetail;



