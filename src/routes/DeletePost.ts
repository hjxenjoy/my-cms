import { redirect } from 'react-router-dom'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function action({ params }: any) {
  await fetch(`/api/posts/${params.postId}`, {
    method: 'DELETE',
  })
  return redirect('/')
}
