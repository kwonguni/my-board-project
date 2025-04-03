// 메인 페이지
import React, {useState} from "react";
import PostList from "../components/PostList";
import PostForm from "../components/PostForm";
// refresh 상태 → 게시글 추가 시 목록을 다시 렌더링
const Home = () => {
    const [editingPost, setEditingPost] = useState(null);

    return (
        <div>
            <h1>게시판</h1>
            <PostForm post={editingPost} refreshPosts={() => window.location.reload()} clearEdit={() => setEditingPost(null)}/>
            <PostList onEdit={setEditingPost} />
        </div>
    )
};

export default Home;