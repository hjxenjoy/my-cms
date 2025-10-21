import { Outlet, useLoaderData, NavLink } from 'react-router-dom'
import { type Post } from '../types'

// Loader: 在组件渲染前加载数据
// eslint-disable-next-line react-refresh/only-export-components
export async function loader() {
  const response = await fetch('/api/posts')
  const posts = await response.json()
  return { posts }
}

export default function RootLayout() {
  const { posts } = useLoaderData() as { posts: Post[] }

  return (
    <div style={{ display: 'flex' }}>
      <nav style={{ borderRight: '1px solid #ccc', padding: '1rem', width: '200px' }}>
        <h2>CMS Posts</h2>
        <NavLink to="/posts/new">
          <button type="button">+ New Post</button>
        </NavLink>
        <ul>
          {posts.map(post => (
            <li key={post.id}>
              <NavLink to={`posts/${post.id}/edit`} className={({ isActive, isPending }) => (isActive ? 'active' : isPending ? 'pending' : '')}>
                {post.title}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
      <main style={{ padding: '1rem', flex: 1 }}>
        <Outlet />
      </main>
    </div>
  )
}
