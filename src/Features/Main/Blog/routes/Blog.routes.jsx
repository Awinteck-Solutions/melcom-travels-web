import { Route, Routes } from 'react-router-dom'
import BlogPage from '../pages/Blog.pages'
import BlogPostPage from '../pages/BlogPost.pages'

const BlogRoutes = () => {
  return (
    <Routes>
      <Route path='' element={<BlogPage />} />
      <Route path=':blogId' element={<BlogPostPage />} />
    </Routes>
  )
}

export default BlogRoutes
