import { useEffect } from "react";
import axios from "axios";
import { usePostState, usePostDispatch } from "../context/PostContext";
import PostItem from "./PostItem.jsx";

export default function PostList() {
    const { posts } = usePostState();
    const dispatch = usePostDispatch();

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const response = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/api/posts`);
                dispatch({type: "SET_POSTS", payload: response.data});    
            } catch (error) {
                console.error("게시글 불러오기 실패:", error);
            }
        };

        fetchPosts();
    }, [dispatch]);

    if(!posts || posts.length === 0) {
        return <div className="p-4">게시글이 없습니다.</div>;
    }

    return (
        <div className="space-y-4">
            {posts.map((post) => (
                <PostItem key={post.id} post={post} />
            ))}
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