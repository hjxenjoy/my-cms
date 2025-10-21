interface Env {
  DB: D1Database
}

// GET 请求处理
export const onRequestGet: PagesFunction<Env> = async context => {
  try {
    const { results } = await context.env.DB.prepare('SELECT * FROM posts ORDER BY created_at DESC').all()
    return new Response(JSON.stringify(results), {
      headers: { 'Content-Type': 'application/json' },
    })
  } catch (e) {
    console.log(e)
    return new Response(JSON.stringify({ error: e.message }), { status: 500 })
  }
}

// POST 请求处理
export const onRequestPost: PagesFunction<Env> = async context => {
  try {
    const { title, content } = await context.request.json()
    if (!title || !content) {
      return new Response(JSON.stringify({ error: 'Title and content are required' }), {
        status: 400,
      })
    }

    const { success } = await context.env.DB.prepare('INSERT INTO posts (title, content) VALUES (?, ?)').bind(title, content).run()

    if (success) {
      return new Response(JSON.stringify({ message: 'Post created successfully' }), { status: 201 })
    } else {
      return new Response(JSON.stringify({ error: 'Failed to create post' }), { status: 500 })
    }
  } catch (e) {
    return new Response(JSON.stringify({ error: e.message }), { status: 500 })
  }
}
