import React, {useState} from "react";
import { createPost, updatePost } from "../api/PostApi";

const PostForm = ({post, refreshPosts, clearEdit}) => {
    const [title, setTitle] = useState(post?.title || "");
    const [content, setContent] = useState(post?.content || "");

    // 게시글 저장 (새 게시글 추가 또는 수정)
    const handleSubmit = async (e) => {
        e.preventDefault();
        if(post) {
            await updatePost(post.id, title, content);
        }
        else {
            await createPost(title, content);
        }
        refreshPosts(); // 목록 갱신
        clearEdit();    // 입력 폼 초기화
    };

    return (
        <form onSubmit={handleSubmit}>
            <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="제목" required/>
            <textarea value={content} onChange={(e) => setContent(e.target.value)} placeholder="내용" required/>
            <button type="submit">{post ? "수정하기" : "작성하기"}</button>
        </form>
    )
};

export default PostForm;