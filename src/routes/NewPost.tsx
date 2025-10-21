import { Form, redirect, useNavigate } from 'react-router-dom'

// Action: 处理表单提交
// eslint-disable-next-line react-refresh/only-export-components
export async function action({ request }: { request: Request }) {
  const formData = await request.formData()
  const post = Object.fromEntries(formData)

  await fetch('/api/posts', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(post),
  })

  // 操作完成后重定向到首页
  return redirect(`/`)
}

export default function NewPost() {
  const navigate = useNavigate()
  return (
    <Form method="post">
      <h2>Create New Post</h2>
      <p>
        <label>Title:</label>
        <br />
        <input type="text" name="title" required style={{ width: '100%' }} />
      </p>
      <p>
        <label>Content:</label>
        <br />
        <textarea name="content" rows={10} required style={{ width: '100%' }} />
      </p>
      <p>
        <button type="submit">Create</button>
        <button type="button" onClick={() => navigate(-1)}>
          Cancel
        </button>
      </p>
    </Form>
  )
}
