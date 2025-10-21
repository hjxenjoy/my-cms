import { redirect } from 'react-router-dom'

export async function action({ params }: any) {
  await fetch(`/api/posts/${params.postId}`, {
    method: 'DELETE',
  })
  return redirect('/')
}
