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
  register: async ({ username, email, password, role }) => {
    let roles = ['USER']
    if (role) {
      roles = ['ADMIN']
    }

    const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/createUser`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        username,
        email,
        password,
        roles
      })
    })

    if (!res.ok) {
      throw new Error(`Something went wrong in /register user, status -> ${res.statusText}`)
    }
    const data = await res.json()
    return data
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
    },
    delete: async ({ token, id }) => {
      let isOk = false
      const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/categoria/${id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      if (!res.ok) {
        throw new Error(`Something went wrong deleting category by ID:${id}, status -> ${res.statusText}`)
      } else {
        isOk = true
      }

      return isOk
    },
    update: async ({ token, id, title, description }) => {
      const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/categoria/`, {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          id,
          titulo: title,
          descripcion: description
        })
      })

      if (!res.ok) {
        throw new Error(`Something went wrong updating category by ID:${id}, status -> ${res.statusText}`)
      }
      const data = await res.json()
      return data
    }
  },
  exam: {
    getExamnsByCategoryId: async ({ token, id }) => {
      const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/examen/categoria/${id}`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      if (!res.ok) {
        throw new Error(`Something went wrong getting examens of category by ID:${id}, status -> ${res.statusText}`)
      }
      const data = await res.json()
      return data
    },
    getExamnsByCategoryIdAndActive: async ({ token, id }) => {
      const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/examen/categoria/activos/${id}`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      if (!res.ok) {
        throw new Error(`Something went wrong getting enabled examens of category by ID:${id}, status -> ${res.statusText}`)
      }
      const data = await res.json()
      return data
    },
    search: async ({ token, query }) => {
      const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/examen/titulo?query=${query}`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      if (!res.ok) {
        throw new Error(`Something went wrong searching examens, status -> ${res.statusText}`)
      }
      const data = await res.json()
      return data
    },
    create: async ({ token, titulo, descripcion, puntosMaximos, numeroDePreguntas, activo, categoria }) => {
      const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/examen/`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          titulo,
          descripcion,
          puntosMaximos,
          numeroDePreguntas,
          activo,
          categoria: {
            id: categoria
          }
        })
      })

      if (!res.ok) {
        throw new Error(`Something went wrong creating exam, status -> ${res.statusText}`)
      }

      const data = await res.json()
      return data
    },
    delete: async ({ token, id }) => {
      let isOk = false
      const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/examen/${id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      if (!res.ok) {
        throw new Error(`Something went wrong deleting exam by ID:${id}, status -> ${res.statusText}`)
      } else {
        isOk = true
      }

      return isOk
    },
    update: async ({ token, id, titulo, descripcion, puntosMaximos, numeroDePreguntas, activo, categoria }) => {
      const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/examen/`, {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          id,
          titulo,
          descripcion,
          puntosMaximos,
          numeroDePreguntas,
          activo,
          categoria: {
            id: categoria
          }
        })
      })
      console.log('ress', res)
      if (!res.ok) {
        throw new Error(`Something went wrong updating exam by ID:${id}, status -> ${res.statusText}`)
      }
      const data = await res.json()
      return data
    },
    getExamenById: async ({ token, id }) => {
      const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/examen/${id}`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      if (!res.ok) {
        throw new Error(`Something went wrong getting exam by ID:${id}, status -> ${res.statusText}`)
      }
      const data = await res.json()
      return data
    },
    resolve: async ({ token, questions }) => {
      const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/pregunta/evaluar-examen`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(questions)
      })

      if (!res.ok) {
        throw new Error(`Hubo un error resolviendo el examen, status -> ${res.statusText}`)
      }
      const data = await res.json()
      return data
    }
  },
  question: {
    getQuestionsOfExam: async ({ token, id }) => {
      const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/pregunta/examen/${id}`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      })
      if (!res.ok) {
        throw new Error(`Ocurrio un error, uso el free tier sorry, api -> questions of exam by ID:${id}, status -> ${res.statusText}`)
      }
      const data = await res.json()
      return data
    },
    create: async (
      { token, contenido, opcion1, opcion2, opcion3, opcion4, respuesta, exam }
    ) => {
      const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/pregunta/`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          contenido,
          opcion1,
          opcion2,
          opcion3,
          opcion4,
          respuesta,
          examen: {
            id: exam
          }
        })
      })

      if (!res.ok) {
        throw new Error(`Something went wrong creating question, status -> ${res.statusText}`)
      }

      const data = await res.json()

      return data
    },
    delete: async ({ token, id }) => {
      let isOk = false
      const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/pregunta/${id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      if (!res.ok) {
        throw new Error(`Something went wrong deleting question by ID:${id}, status -> ${res.statusText}`)
      } else {
        isOk = true
      }

      return isOk
    },
    update: async ({ token, id, contenido, opcion1, opcion2, opcion3, opcion4, respuesta, exam }) => {
      const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/pregunta/`, {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          id,
          contenido,
          opcion1,
          opcion2,
          opcion3,
          opcion4,
          respuesta,
          examen: {
            id: exam
          }
        })
      })

      if (!res.ok) {
        throw new Error(`Something went wrong updating question by ID:${id}, status -> ${res.statusText}`)
      }
      const data = await res.json()
      return data
    },
    getQuestionById: async ({ token, id }) => {
      const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/pregunta/${id}`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      if (!res.ok) {
        throw new Error(`Something went wrong getting question by ID:${id}, status -> ${res.statusText}`)
      }
      const data = await res.json()
      return data
    }
  },
  admin: {
    register: async ({ username, email, password, role }) => {
      let roles
      if (role === 'admin') {
        roles = ['ADMIN']
      }
      if (role === 'user') {
        roles = ['USER']
      }

      const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/createUser`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          username,
          email,
          password,
          roles
        })
      })

      if (!res.ok) {
        throw new Error(`Something went wrong in /register user, status -> ${res.statusText}`)
      }
      const data = await res.json()
      return data
    }
  }
}
