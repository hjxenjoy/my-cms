import { Form, useLoaderData, redirect, useNavigate } from 'react-router-dom'
import { type Post } from '../types'

// Loader: 获取特定 ID 的文章数据
export async function loader({ params }: any) {
  const response = await fetch(`/api/posts/${params.postId}`)
  if (!response.ok) {
    throw new Response('Not Found', { status: 404 })
  }
  return response.json()
}

// Action: 处理更新逻辑
export async function action({ request, params }: any) {
  const formData = await request.formData()
  const updates = Object.fromEntries(formData)

  await fetch(`/api/posts/${params.postId}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(updates),
  })

  return redirect(`/posts/${params.postId}/edit`) // 重定向回编辑页
}

export default function EditPost() {
  const post = useLoaderData() as Post
  const navigate = useNavigate()

  return (
    <>
      <Form method="post" key={post.id}>
        <h2>Edit Post</h2>
        <p>
          <label>Title:</label>
          <br />
          <input type="text" name="title" defaultValue={post.title} required style={{ width: '100%' }} />
        </p>
        <p>
          <label>Content:</label>
          <br />
          <textarea name="content" defaultValue={post.content} rows={10} required style={{ width: '100%' }} />
        </p>
        <p>
          <button type="submit">Save</button>
          <button type="button" onClick={() => navigate(-1)}>
            Cancel
          </button>
        </p>
      </Form>
      <DeletePostButton postId={post.id} />
    </>
  )
}

// 删除按钮和表单
function DeletePostButton({ postId }: { postId: number }) {
  return (
    <Form
      method="post"
      action={`/posts/${postId}/destroy`}
      onSubmit={event => {
        if (!confirm('Please confirm you want to delete this record.')) {
          event.preventDefault()
        }
      }}
      style={{ display: 'inline', marginLeft: '10px' }}
    >
      <button type="submit">Delete</button>
    </Form>
  )
}
