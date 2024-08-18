import { Route, Routes } from 'react-router-dom';
import PrivateRoute from './components/auth/PrivateRoute';
import HomePage from './pages/HomePage';
import PostDetailsPage from './pages/PostDetailsPage';
import AddPostPage from './pages/AddPostPage';
import SearchResultPage from './pages/SearchResultPage';
import PublicRoute from './components/auth/PublicRoute';
import AuthPage from './pages/AuthPage';
import style from './App.module.css';
import UserPostPage from './pages/UserPostPage';

function App() {
  return (
    <div className={style.container}>
      <Routes>
        <Route 
          path='/auth' 
          element={
            <PublicRoute>
              <AuthPage />
            </PublicRoute>
          } 
        />
        <Route 
          path='/'
          element={
            <PrivateRoute>
              <HomePage />
            </PrivateRoute>
          }
        >
          <Route path='/post/:id' element={<PostDetailsPage />} />
          <Route path='/createpost' element={<AddPostPage />} />
          <Route path='/search' element={<SearchResultPage />} />
          <Route path='/posts' element={<UserPostPage/>} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
