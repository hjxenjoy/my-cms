import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './index.css'

// 导入你的页面组件 (稍后创建)
import RootLayout, { loader as rootLoader } from './routes/RootLayout'
import PostList, { loader as postsLoader } from './routes/PostList'
import NewPost, { action as newPostAction } from './routes/NewPost'
import EditPost, { loader as editPostLoader, action as editPostAction } from './routes/EditPost'
import { action as deletePostAction } from './routes/DeletePost'

const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    loader: rootLoader, // 加载所有文章，用于侧边栏
    children: [
      {
        index: true, // 默认子路由
        element: <PostList />,
        loader: postsLoader, // 也可以直接使用父路由的数据
      },
      {
        path: 'posts/new',
        element: <NewPost />,
        action: newPostAction,
      },
      {
        path: 'posts/:postId/edit',
        element: <EditPost />,
        loader: editPostLoader,
        action: editPostAction,
      },
      {
        path: 'posts/:postId/destroy',
        action: deletePostAction,
      },
    ],
  },
])

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
)
