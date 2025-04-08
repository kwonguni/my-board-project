import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import PostList from "./components/PostList.jsx";
import PostDetail from "./components/PostDetail.jsx";
import PostEdit from "./components/PostEdit.jsx";
import PostCreate from "./components/PostCreate.jsx";

const App = () => {
    return (
        <Router>
            <Routes>
                {/* 홈 페이지 */}
                <Route path="/" element={
                    <div className="p-4">
                        <h1 className="text-3xl font-bold mb-4">게시판</h1>
                        <PostList />
                    </div>
                } />
                {/* 글 작성 페이지 */}
                <Route path="/create" element={<PostCreate />} />
                {/* 상세 페이지 */}
                <Route path="/posts/:id" element={<PostDetail />} />
                {/* 수정 페이지 */}
                <Route path="/posts/:id/edit" element={<PostEdit />} />
            </Routes>
        </Router>
    );
};

export default App;