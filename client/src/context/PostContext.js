import React, { createContext, useReducer, useContext } from "react";

const PostStateContext = createContext();
const PostDispatchContext = createContext();

// 초기 상태
const initialState  = {
    posts: [],
    totalPages: 1,
    currentPage: 1,
    totalCount:0
};

// 액션 타입 정의
function reducer(state, action) {
    switch(action.type) {
        case "SET_POSTS":
            return {
                ...state, 
                posts: action.payload.posts,
                totalPages: action.payload.totalPages,
                currentPage: action.payload.currentPage,
                totalCount: action.payload.totalCount
            };
        case "SET_CURRENT_PAGE":
            return {
                ...state,
                currentPage: action.payload
            }
        case "ADD_POST":
            return {...state, posts: [action.payload, ...state.posts]};
        case "UPDATE_POST":
            return {
                ...state,
                posts: state.posts.map((post) => post.id === action.payload.id ? action.payload : post)
            };
        case "DELETE_POST":
            return {
                ...state,
                posts: state.posts.filter((post) => post.id !== action.payload)
            };    
        default:
            return state;
    }
}

export const PostProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState);

    return (
        <PostStateContext.Provider value={state}>
            <PostDispatchContext.Provider value={dispatch}>
                {children}
            </PostDispatchContext.Provider>
        </PostStateContext.Provider>
    );
}

export const usePostState = () => {
    const context = useContext(PostStateContext);
    if (context === undefined) {
      throw new Error("usePostState must be used within a PostProvider");
    }
    return context;
};

export const usePostDispatch = () => {
    const context = useContext(PostDispatchContext);
    if (context === undefined) {
      throw new Error("usePostDispatch must be used within a PostProvider");
    }
    return context;
  };