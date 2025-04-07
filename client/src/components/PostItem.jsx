// import React from "react";
import { Link } from 'react-router-dom';

const PostItem = ({post}) => {
    return (
        <div className="border-b py-4">
            <Link to={`/posts/${post.id}`} className="text-xl font-bold hover:underline">
                {post.title}
            </Link>
            <p className='text-gray-500 text-sm'>작성자: {post.author}</p>
        </div>    
    );
};

export default PostItem;