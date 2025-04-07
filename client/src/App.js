import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import PostList from './components/PostList';
import PostDetail from './components/PostDetail';
import PostCreate from './components/PostCreate';

function App() {
  return (
  <Router>
    <Routes>
      <Route path='/' element={<PostList />} />
      <Route path='/posts:id' element={<PostDetail />} />
      <Route path='/create' element={<PostCreate />} />
    </Routes>
  </Router>
  );
}

export default App;
