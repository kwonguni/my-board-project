import { useEffect, useState } from "react";
import axios from "axios";
import { usePostState, usePostDispatch } from "../context/PostContext";
import PostItem from "./PostItem.jsx";

export default function PostList() {
    const [loading, setLoading] = useState(false);
    const { posts, totalPages, currentPage, totalCount } = usePostState();
    const dispatch = usePostDispatch();
    const postsPerPage = 5;
    
    useEffect(() => {
        const fetchPosts = async () => {
            setLoading(true);
            try {
                const response = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/api/posts`,
                    {params: {page: currentPage, size: postsPerPage}}
                );
                dispatch({
                    type: "SET_POSTS", 
                    payload: {
                        posts: response.data.posts, 
                        totalPages: response.data.totalPages,
                        currentPage: response.data.currentPage,
                        totalCount: response.data.totalCount
                    }
                });    
            } catch (error) {
                console.error("게시글 불러오기 실패:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchPosts();
    }, [dispatch, currentPage]);    // currentPage 변경 시에도 요청됨.

    if(loading) return <div className="p-4 text-center">로딩중...</div>

    if(!posts || posts.length === 0) {
        return <div className="p-4">게시글이 없습니다.</div>;
    }

    return (
        <div className="space-y-4">
            {posts.map((post) => (
                <PostItem key={post.id} post={post} />
            ))}

            {/* 페이지네이션 버튼 */}
            <div className="flex justify-center mt-6 space-x-2">
                <button 
                    onClick={() => dispatch({ type: "SET_CURRENT_PAGE", payload: Math.max(currentPage - 1, 1) })}
                    disabled={currentPage === 1}
                    className="px-3 py-1 border rounded disabled:opacity-50">
                    prev
                </button>
                {[...Array(totalPages)].map((_, i) => (
                    <button key={i+1}
                        onClick={() => dispatch({ type: "SET_CURRENT_PAGE", payload: i + 1 })}
                        className={`px-3 py-1 border rounded ${currentPage === i + 1 ? "bg-blue-500 text-white" : ""}`}>{i + 1}</button>
                ))}

                <button 
                    onClick={() => dispatch({ type: "SET_CURRENT_PAGE", payload: Math.min(currentPage + 1, totalPages) })} 
                    disabled={currentPage === totalPages}
                    className="px-3 py-1 border rounded disabled:opacity-50">
                    next
                </button>
            </div>
        </div>
    );
}


// const PostList = ({posts}) => {
//     if(posts.length === 0) {
//         return <div className="p-4">게시글이 없습니다.</div>;
//     }

//     return (
//         <div className="p-4">
//             {posts.map((post) => (
//                 <div key={post.id} className="border-b py-2 flex justify-between items-center">
//                     <Link to={`/posts/${post.id}`} className="text-blue-600 font-medium">
//                         {post.title}
//                     </Link>
//                     <span className="text-sm text-gray-500">{post.author}</span>
//                 </div>
//             ))}
//         </div>
//     );
// };

// export default PostList;