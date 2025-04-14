// import React from "react";
import { Link } from 'react-router-dom';

const PostItem = ({post, postNumber, formatDate}) => {
    return (
        <div className="border-b py-4">
            <div className='flex items-center space-x-3'>
                <span className='w-12 text-sm text-gray-500'>No. {postNumber}</span>
                <Link to={`/posts/${post.id}`} className="text-xl font-bold hover:underline">
                    {post.title}
                </Link>
            </div>
            <p className='text-gray-500 text-sm'>작성자: {post.author}</p>
            <p className='text-gray-400 text-xs'>{ formatDate(post.created_at) }</p>
            {/* { <p>{JSON.stringify(post, null, 2)}</p> } */}
        </div>    
    );
};

export default PostItem;