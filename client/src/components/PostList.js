// 게시글 목록 컴포넌트
// 상태관리 : 상태가 점점 많아질수록 useState보다는 useReducer가 더 적합할 수 있다.
import React, {useEffect, useReducer } from "react";
import { getPosts, deletePost, updatePost } from "../api/PostApi";
import PostItem from "./PostItem";

// 초기 상태 정의
const initalState = {
    posts: [],
    editPost: null,
    title: "",
    content: ""
};

//  reducer 함수 정의
const postReducer = (state, action) => {
    // ...state : 기존 상태는 유지하면서 일부 값만 바꾸는 용도
    switch(action.type) {
        case "FETCH_POSTS":
            return {...state, posts: action.payload};
        case "DELETE_POST":
            return {...state, posts: state.posts.filter(post => post.id !== action.payload)};
        case "EDIT_POST":
            return {...state, editPost: action.payload, title: action.payload.title, content: action.payload.content};
        case "UPDATE_POST":
            return {
                ...state, 
                posts: state.posts.map(post => post.id === state.editPost.id ? {...post, title: state.title, content: state.content} : post),
                editPost: null,
                title: "",
                content: ""
            };
        case "CANCEL_EDIT":
            return {...state, editPost: null, title: "", content: ""};
        case "CHANGE_FIELD":
            return {...state, [action.field]: action.value};   
        default:
            return state;
    }
};

const PostList = () => {
    const [state, dispatch] = useReducer(postReducer, initalState);
    // const [posts, setPosts] = useState([]);
    // const [editPost, setEditPost] = useState(null);
    // const [title, setTitle] = useState("");
    // const [content, setContent] = useState("");

    // useEffect() → 컴포넌트가 처음 렌더링될 때 게시글 데이터를 가져옴
    useEffect(() => {
        console.log("✅ useEffect 실행됨! (게시글 불러오기)");
        fetchPosts();
    }, []);

    const fetchPosts = async () => {
        const data = await getPosts();
        dispatch({type: "FETCH_POSTS", payload: data});
        // setPosts(data);
    };

    // 게시글 삭제
    const handleDelete = async (id) => {
        await deletePost(id);
        // fetchPosts();   // 삭제 후 목록 갱신
        dispatch({type: "DELETE_POST", payload: id});
    };

    // 수정모드 활성화
    const handleEdit = (post) => {
        // setEditPost(post);
        // setTitle(post.title);
        // setContent(post.content);
        dispatch({type: "EDIT_POST", payload: post});
    };

    // 수정 기능
    const handleUpdate = async() => {
        // if(editPost) {
        //     await updatePost(editPost.id, title, content);
        //     setEditPost(null);
        //     setTitle("");
        //     setContent("");
        //     fetchPosts();
        // }
        if(state.editPost) {
            await updatePost(state.editPost.id, state.title, state.content);
            dispatch({type: "UPDATE_POST"});
            fetchPosts();
        }
    };

    return (
        <div className="p-6">
            <h2 className="text-2xl font-bold mb-4">게시글 목록</h2>
            <ul>
                {state.posts.map((post) => (
                    <PostItem 
                        key={post.id}
                        post={post}
                        editPost={state.editPost}
                        title={state.title}
                        content={state.content}
                        onEdit={handleEdit}
                        onDelete={handleDelete}
                        onUpdate={handleUpdate}
                        onCancel={() => dispatch({type: "CANCEL_EDIT"})}
                        onChange={(field, value) => dispatch({type: "CHANGE_FIELD", field, value})}
                    />
                    // <li key={post.id} className="border p-4 mb-2 rounded-lg shadow">
                    //     {state.editPost && state.editPost.id === post.id ? (
                    //         // 수정모드
                    //         <div>
                    //             <input type="text" value={state.title} onChange={(e) => dispatch({type: "EDIT_POST", payload: {...state.editPost, title: e.target.value}})} className="border p-2 rounded w-full"/>
                    //             <textarea value={state.content} onChange={(e) => dispatch({type: "EDIT_POST", payload: {...state.editPost, content: e.target.value}})} className="border p-2 rounded w-full mt-2"/>
                    //             <button onClick={handleUpdate} className="bg-blue-500 text-white px-4 py-2 rounded mt-2">수정 완료</button>
                    //             <button onClick={() => dispatch({type: "CANCEL_EDIT"})} className="bg-gray-500 text-white px-4 py-2 rounded mt-2 ml-2">취소</button>    
                    //         </div>
                    //     ) : (
                    //         <div>
                    //             <h3 className="text-xl font-semibold">{post.title}</h3>
                    //             <p>{post.content}</p>
                    //             <button onClick={() => handleEdit(post)} className="bg-yellow-500 text-white px-4 py-2 rounded mt-2">수정</button>
                    //             <button onClick={() => handleDelete(post.id)} className="bg-red-500 text-white px-4 py-2 rounded mt-2 ml-2">삭제</button>
                    //         </div>
                    //     )}
                    // </li>
                ))}
            </ul>
        </div>
    );
};

export default PostList;