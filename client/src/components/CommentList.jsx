import { useEffect, useState } from "react";
import axios from "axios";

export default function CommentList({ postId }) {
    const [ comments, setComments ] = useState([]);
    const [ content, setContent ] = useState("");
    const [ author, setAuthor ] = useState("");

    const [ editingCommentId, setEditingCommentId] = useState(null);
    const [ editContent, setEditContent] = useState("");

    // 댓글 불러오기
    const fetchComments = async () => {
        try {
            const response = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/api/posts/${postId}/comments`);
            setComments(response.data);    
        } catch (error) {
            console.error("댓글 불러오기 실패", error);
        }
    };

    // 댓글 등록
    const handleSubmit = async (e) => {
        e.preventDefault();
        if(!author || !content) return alert("작성자와 내용을 입력하세요.");
        
        try {
            await axios.post(`${process.env.REACT_APP_API_BASE_URL}/api/posts/${postId}/comments`, {
                author,
                content
            });
    
            setContent("");
            fetchComments();    // 댓글 다시 불러오기    
        } catch (error) {
            console.error("댓글 등록 실패", error);
        } 
    };

    // 댓글 삭제
    const handleDelete = async (commentId) => {
        if(!window.confirm("댓글을 삭제하시겠습니까?")) return;
        try {
            await axios.delete(`${process.env.REACT_APP_API_BASE_URL}/api/comments/${commentId}`);
            fetchComments();    
        } catch (error) {
            console.error("댓글 삭제 실패", error);
        }
    };

    const handleEdit = (comment) => {
        setEditingCommentId(comment.id);
        setEditContent(comment.content);
    };

    const handleEditSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`${process.env.REACT_APP_API_BASE_URL}/api/comments/${editingCommentId}`, {
                content: editContent
            });
            setEditingCommentId(null);
            setEditContent("");
            fetchComments();
        } catch (error) {
            console.error("댓글 수정 실패", error);
        }
    };

    useEffect(() => {
        fetchComments();
    }, [postId]);

    return (
        <div className="mt-6 border-t pt-4">
            <h3 className="font-semibold text-lg mb-2">댓글</h3>
            {comments.length === 0 && <p className="text-gray-500">댓글이 없습니다.</p>}
            <ul className="space-y-2 mb-4">
                {comments.map((comment) => (
                    <li key={comment.id} className="border p-2 rounded">
                        {editingCommentId === comment.id ? (
                            <form onSubmit={handleEditSubmit} className="space-y-1">
                                <input type="text" value={editContent} onChange={(e) => setEditContent(e.target.value)} className="w-full p-1 border rounded"/>
                                <div className="flex gap-2">
                                    <button type="submit" className="text-blue-500 text-sm">💾 저장</button>
                                    <button type="button" onClick={() => setEditingCommentId(null)} className="text-gray-500 text-sm">❌ 취소</button>
                                </div>
                            </form>
                        ) : (
                            <>
                                <p className="text-sm text-gray-800">{comment.content}</p>
                                <p className="text-xs text-gray-500">작성자: {comment.author}</p>
                                <div className="flex gap-2 mt-1">
                                    <button onClick={() => handleEdit(comment)} className="text-blue-500 text-sm">✏️ 수정</button>
                                    <button onClick={() => handleDelete(comment.id)} className="text-red-500 text-sm">❌ 삭제</button>
                                </div>
                            </>
                        )}
                    </li>
                ))}
            </ul>

            <form onSubmit={handleSubmit} className="space-y-2">
                <input type="text" placeholder="작성자" value={author} onChange={(e) => setAuthor(e.target.value)} className="w-full p-2 border rounded" />
                <input type="text" placeholder="댓글 내용을 입력하세요" value={content} onChange={(e) => setContent(e.target.value)} className="w-full p-2 border rounded" />
                <button type="submit" className="bg-blue-500 text-white px-4 rounded hover:bg-blue-600">
                    댓글 등록
                </button>
            </form>
        </div>
    )
};