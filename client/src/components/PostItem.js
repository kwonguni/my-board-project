import React from "react";

// <li> 모듈화
const PostItem = ({post, editPost, title, content, onEdit, onDelete, onUpdate, onCancel, onChange}) => {
    return (
        <li className="border p-4 mb-2 rounded-lg shadow">
            {editPost && editPost.id === post.id ? (
                // 수정모드
                <div>
                    <input type="text" value={title} onChange={(e) => onChange("title", e.target.value)} className="border p-2 rounded w-full"/>
                    <textarea value={content} onChange={(e) => onChange("content", e.target.value)} className="border p-2 rounded w-full mt-2"/>
                    <button onClick={onUpdate} className="bg-blue-500 text-white px-4 py-2 rounded mt-2">수정 완료</button>
                    <button onClick={onCancel} className="bg-gray-500 text-white px-4 py-2 rounded mt-2 ml-2">취소</button>    
                </div>
            ) : (
                <div>
                    <h3 className="text-xl font-semibold">{post.title}</h3>
                    <p>{post.content}</p>
                    <button onClick={() => onEdit(post)} className="bg-yellow-500 text-white px-4 py-2 rounded mt-2">수정</button>
                    <button onClick={() => onDelete(post.id)} className="bg-red-500 text-white px-4 py-2 rounded mt-2 ml-2">삭제</button>
                </div>
            )}
        </li>
    );
};

export default PostItem;