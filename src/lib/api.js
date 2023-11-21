export const api = {
  login: async (path, { username, password }) => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/${path}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        username,
        password
      })
    })

    return res
  },
  category: {
    getAll: async ({ token }) => {
      return fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/categorias`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${'token'}`
        }
      })
    }
  }
}
