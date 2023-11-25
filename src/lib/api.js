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
        throw new Error(`Something went wrong getting all categories, status -> ${res.statusText}`)
      }
      const data = await res.json()
      return data
    },
    search: async ({ token, query }) => {
      const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/categoria/titulo?query=${query}`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      if (!res.ok) {
        throw new Error(`Something went wrong searching categories, status -> ${res.statusText}`)
      }
      const data = await res.json()
      return data
    },
    create: async ({ token, title, description }) => {
      const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/categoria/`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          titulo: title,
          descripcion: description
        })
      })
      if (!res.ok) {
        throw new Error(`Something went wrong creating category, status -> ${res.statusText}`)
      }
      const data = await res.json()
      return data
    },
    getById: async ({ token, id }) => {
      const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/categoria/${id}`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      if (!res.ok) {
        throw new Error(`Something went wrong getting category by ID:${id}, status -> ${res.statusText}`)
      }
      const data = await res.json()
      return data
    }
  }
}
