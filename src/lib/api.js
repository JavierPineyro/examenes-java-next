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
      const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/categoria/`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      if (!res.ok) {
        console.log('tokeeeeeeeeeen', token)
        throw new Error(`Something went wrong, status -> ${res.statusText}`)
      }
      const data = await res.json()
      return data
    }
  }
}
