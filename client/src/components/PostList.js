// 게시글 목록 컴포넌트
import React, {useEffect, useState} from "react";
import { getPosts, deletePost } from "../api/PostApi";

const PostList = ({onEdit}) => {
    const [posts, setPosts] = useState([]);

    // useEffect() → 컴포넌트가 처음 렌더링될 때 게시글 데이터를 가져옴
    useEffect(() => {
        fetchPosts();
    }, []);

    const fetchPosts = async () => {
        const data = await getPosts();
        setPosts(data);
    };

    // 게시글 삭제
    const handleDelete = async (id) => {
        await deletePost(id);
        fetchPosts();   // 삭제 후 목록 갱신
    }

    return (
        <div>
            <h2>게시글 목록</h2>
            <ul>
                {posts.map((post) => (
                    <li key={post.id}>
                        <h3>{post.title}</h3>
                        <p>{post.content}</p>
                        <button onClick={() => onEdit(post)}>수정</button>
                        <button onClick={() => handleDelete(post.id)}>삭제</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default PostList;