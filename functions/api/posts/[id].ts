interface Env {
  DB: D1Database
}

// GET /api/posts/:id
export const onRequestGet: PagesFunction<Env> = async context => {
  try {
    const id = context.params.id as string
    const post = await context.env.DB.prepare('SELECT * FROM posts WHERE id = ?').bind(id).first()

    if (!post) {
      return new Response(JSON.stringify({ error: 'Post not found' }), { status: 404 })
    }
    return new Response(JSON.stringify(post), { headers: { 'Content-Type': 'application/json' } })
  } catch (e) {
    return new Response(JSON.stringify({ error: e.message }), { status: 500 })
  }
}

// PUT /api/posts/:id
export const onRequestPut: PagesFunction<Env> = async context => {
  try {
    const id = context.params.id as string
    const { title, content } = await context.request.json()
    if (!title || !content) {
      return new Response(JSON.stringify({ error: 'Title and content are required' }), {
        status: 400,
      })
    }
    await context.env.DB.prepare('UPDATE posts SET title = ?, content = ? WHERE id = ?')
      .bind(title, content, id)
      .run()
    return new Response(JSON.stringify({ message: 'Post updated' }), { status: 200 })
  } catch (e) {
    return new Response(JSON.stringify({ error: e.message }), { status: 500 })
  }
}

// DELETE /api/posts/:id
export const onRequestDelete: PagesFunction<Env> = async context => {
  try {
    const id = context.params.id as string
    await context.env.DB.prepare('DELETE FROM posts WHERE id = ?').bind(id).run()
    return new Response(null, { status: 204 }) // No Content
  } catch (e) {
    return new Response(JSON.stringify({ error: e.message }), { status: 500 })
  }
}
