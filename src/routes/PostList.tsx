import { useLoaderData } from 'react-router-dom'
import { type Post } from '../types'

// Loader 可以从父路由继承，也可以自己再获取一次
export async function loader() {
  const response = await fetch('/api/posts')
  return response.json()
}

export default function PostList() {
  const posts = useLoaderData() as Post[]

  return (
    <div>
      <h1>All Posts</h1>
      <p>Select a post from the list to edit, or create a new one.</p>
      {posts.length === 0 && <p>No posts yet. Create one!</p>}
    </div>
  )
}
