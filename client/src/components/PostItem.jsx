// import React from "react";
import { Link } from 'react-router-dom';

const PostItem = ({post}) => {
    return (
        <div className="border-b py-4">
            <Link to={`/posts/${post.id}`} className="text-xl font-bold hover:underline">
                {post.title}
            </Link>
            <p className='text-gray-500 text-sm'>작성자: {post.author}</p>
            <p className='text-gray-400 text-xs'>
                {new Date(post.created_at).toLocaleString('ko-KR', {
                    year: 'numeric',
                    month: '2-digit',
                    day: '2-digit',
                    hour: '2-digit',
                    minute: '2-digit'
                })}
            </p>
            {/* { <p>{JSON.stringify(post, null, 2)}</p> } */}
        </div>    
    );
};

export default PostItem;