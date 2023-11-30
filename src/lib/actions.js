'use server'

import { redirect } from 'next/navigation'
import { revalidatePath } from 'next/cache'
import { api } from './api'
import { createCategorySchema, createExamSchema, createQuestionSchema, createRegisterSchema, createUserSchema, updateCategorySchema, updateExamSchema, updateQuestionSchema, validatePassword } from './utils'
import { ZodError } from 'zod'

// ---------- CATEGORY ----------

export async function createCategory(formData) {
  let isOk
  let isError
  let errorMessage = ''
  try {
    const { title, description, token } = createCategorySchema.parse({
      title: formData.get('titulo'),
      description: formData.get('descripcion'),
      token: formData.get('token')
    })
    const data = await api.category.create({ token, title, description })
    if (data) {
      isError = false
      isOk = true
    }
  } catch (error) {
    isError = true
    isOk = false

    if (error instanceof ZodError) {
      errorMessage = 'Campo del formulario: ' + error.issues[0].message
      console.error('Error de ZOD validation on create category', error)
    } else {
      errorMessage = 'intentalo más tarde'
      console.error('Error on create category', error)
    }
  }

  if (isOk && !isError) {
    revalidatePath('/dashboard/categoria')
    redirect('/dashboard/categoria?message=La categoria se ha creado correctamente')
  }

  if (!isOk && isError) {
    redirect(`/dashboard/categoria/create?message=No se pudo crear la categoria,${errorMessage}&error=true`)
  }
}

export async function deleteCategory({ token, id }, formData) {
  let isOk
  let isError
  let errorMessage = ''
  try {
    const status = await api.category.delete({ token, id })
    if (status === true) {
      isOk = true
      isError = false
    }
  } catch (error) {
    isError = true
    isOk = false
    errorMessage = 'No se pudo eliminar, intentalo mas tarde'
  }

  if (isOk && !isError) {
    revalidatePath('/dashboard/categoria')
    redirect('/dashboard/categoria?message=La categoria fue eliminada correctamente')
  }
  if (!isOk && isError) {
    redirect(`/dashboard/categoria/${id}?message=${errorMessage}&error=true`)
  }
}

export async function updateCategory({ token, id }, formData) {
  let isError
  let isOk
  let errorMessage = ''

  try {
    const { title, description } = updateCategorySchema.parse({
      title: formData.get('titulo'),
      description: formData.get('descripcion')
    })
    const data = await api.category.update({ token, id, title, description })
    if (data) {
      isError = false
      isOk = true
    } else {
      isError = true
      isOk = false
    }
  } catch (error) {
    isError = true
    isOk = false

    if (error instanceof ZodError) {
      errorMessage = 'Campo del formulario: ' + error.issues[0].message
      console.error('Error de ZOD validation on update category', error)
    } else {
      errorMessage = 'intentalo más tarde'
      console.error('Error updating category', error)
    }
  }

  if (isOk && !isError) {
    revalidatePath('/dashboard/categoria')
    redirect(`/dashboard/categoria/${id}?message=La categoria se ha actualizado correctamente`)
  }

  if (!isOk && isError) {
    redirect(`/dashboard/categoria/${id}?message=No se pudo actualizar la categoria,${errorMessage}&error=true`)
  }
}

// ---------- REGISTER ----------
export async function register(formData) {
  let isOk
  let isError
  let errorMessage = ''
  let data = null

  try {
    const { username, password, email, repeatPassword } = createRegisterSchema.parse({
      username: formData.get('username'),
      password: formData.get('password'),
      email: formData.get('email'),
      repeatPassword: formData.get('repeatPassword')
    })
    const { isValidPassword, message } = validatePassword(password, repeatPassword)
    if (isValidPassword) {
      data = await api.register({ username, email, password })
      if (data) {
        isError = false
        isOk = true
      } else {
        isError = true
        isOk = false
      }
    } else {
      isError = true
      isOk = false
      errorMessage = message
    }
  } catch (error) {
    isError = true
    isOk = false
    if (error instanceof ZodError) {
      errorMessage = error.issues[0].message
      console.error('Error de ZOD validation on register', errorMessage)
    } else {
      errorMessage = 'No se pudo crear el usuario, intentelo de nuevo mas tarde'
      console.error('Error en el registro', error)
    }
  }

  if (isOk && !isError) {
    redirect('/login?message=Usuario creado correctamente')
  }

  if (!isOk && isError) {
    redirect(`/register?message=${errorMessage}&error=true`)
  }
}

export async function registerAsAdmin(formData) {
  let isOk
  let isError
  let errorMessage = ''
  let data = null

  try {
    const { username, password, email, repeatPassword, role } = createUserSchema.parse({
      username: formData.get('username'),
      password: formData.get('password'),
      email: formData.get('email'),
      repeatPassword: formData.get('repeatPassword'),
      role: formData.get('role')
    })
    const { isValidPassword, message } = validatePassword(password, repeatPassword)
    if (isValidPassword) {
      data = await api.admin.register({ username, email, password, role })
      if (data) {
        isError = false
        isOk = true
      } else {
        isError = true
        isOk = false
      }
    } else {
      isError = true
      isOk = false
      errorMessage = message
    }
  } catch (error) {
    isError = true
    isOk = false
    if (error instanceof ZodError) {
      errorMessage = error.issues[0].message
      console.error('Error de ZOD validation on register', errorMessage)
    } else {
      errorMessage = 'No se pudo crear el usuario, intentelo de nuevo mas tarde'
      console.error('Error en el registro', error)
    }
  }

  if (isOk && !isError) {
    redirect(`/users?message=Usuario ${data?.username} creado correctamente con contraseña`)
  }

  if (!isOk && isError) {
    redirect(`/users?message=${errorMessage}&error=true`)
  }
}

// ---------- EXAM ----------
export async function createExam({ token }, formData) {
  let isOk
  let isError
  let errorMessage = ''

  try {
    const { titulo, descripcion, numeroDePreguntas, puntosMaximos, activo, categoria } = createExamSchema.parse({
      titulo: formData.get('titulo'),
      descripcion: formData.get('descripcion'),
      numeroDePreguntas: formData.get('numeroDePreguntas'),
      puntosMaximos: formData.get('puntosMaximos'),
      activo: formData.get('activo'),
      categoria: formData.get('categoria')
    })

    const data = await api.exam.create({
      token,
      titulo,
      descripcion,
      numeroDePreguntas,
      puntosMaximos,
      activo: activo === 'true',
      categoria: Number(categoria)
    })

    if (data) {
      isOk = true
      isError = false
    }
  } catch (error) {
    isError = true
    isOk = false
    if (error instanceof ZodError) {
      errorMessage = error.issues[0].message
      console.error('Error de ZOD validation on update exam', error)
    } else {
      errorMessage = 'intentelo de nuevo mas tarde'
      console.error('Error on create exam', error)
    }
  }

  if (isOk && !isError) {
    revalidatePath('/dashboard/examen')
    redirect('/dashboard/examen?message=El examen se ha creado correctamente!')
  }

  if (!isOk && isError) {
    redirect(`/dashboard/examen?message=No se pudo crear el examen, ${errorMessage}&error=true`)
  }
}

export async function deleteExam({ token, id }, formData) {
  let isOk
  let isError
  let errorMessage = ''

  try {
    const status = await api.exam.delete({ token, id })
    if (status === true) {
      isOk = true
      isError = false
    }
  } catch (error) {
    isError = true
    isOk = false
    errorMessage = 'No se pudo eliminar, intentalo mas tarde'
  }

  if (isOk && !isError) {
    revalidatePath('/dashboard/examen')
    redirect('/dashboard/examen?message=El examen se ha eliminado correctamente!')
  }
  if (!isOk && isError) {
    redirect(`/dashboard/examen?message=${errorMessage}&error=true`)
  }
}

export async function updateExam({ token, id }, formData) {
  let isOk
  let isError
  let errorMessage = ''
  try {
    const {
      titulo, descripcion,
      numeroDePreguntas, puntosMaximos,
      activo, categoria
    } = updateExamSchema.parse({
      titulo: formData.get('titulo'),
      descripcion: formData.get('descripcion'),
      numeroDePreguntas: formData.get('numeroDePreguntas'),
      puntosMaximos: formData.get('puntosMaximos'),
      activo: formData.get('activo'),
      categoria: formData.get('categoria')
    })

    const data = await api.exam.update({
      token,
      id,
      titulo,
      descripcion,
      numeroDePreguntas,
      puntosMaximos,
      activo: activo === 'true',
      categoria: Number(categoria)
    })

    if (data) {
      isOk = true
      isError = false
    }
  } catch (error) {
    isError = true
    isOk = false
    if (error instanceof ZodError) {
      errorMessage = 'Campo del formulario: ' + error.issues[0].message
      console.error('Error de ZOD validation on update exam', error)
    } else {
      errorMessage = 'intentalo más tarde'
      console.error('Error updating exam', error)
    }
  }

  if (isOk && !isError) {
    revalidatePath('/dashboard/examen')
    redirect('/dashboard/examen?message=El examen se ha actualizado correctamente!')
  }

  if (!isOk && isError) {
    redirect(`/dashboard/examen?message=No se pudo actualizar el examen, ${errorMessage}&error=true`)
  }
}

// ---------- QUESTION ----------

export async function createQuestion({ token, id }, formData) {
  let isOk
  let isError
  let errorMessage = ''

  try {
    const {
      contenido, opcion1, opcion2, opcion3, opcion4, respuesta
    } = createQuestionSchema.parse({
      contenido: formData.get('contenido'),
      opcion1: formData.get('opcion1'),
      opcion2: formData.get('opcion2'),
      opcion3: formData.get('opcion3'),
      opcion4: formData.get('opcion4'),
      respuesta: formData.get('respuesta')
    })

    const data = await api.question.create({
      token,
      exam: id,
      contenido,
      opcion1,
      opcion2,
      opcion3,
      opcion4,
      respuesta
    })
    if (data) {
      isOk = true
      isError = false
    }
  } catch (error) {
    isError = true
    isOk = false
    if (error instanceof ZodError) {
      errorMessage = 'Campo del formulario: ' + error.issues[0].message
      console.error('Error de ZOD validation on create question', error)
    } else {
      errorMessage = 'intentalo mas tarde'
      console.error('Error creating question', error)
    }
  }
  if (isOk && !isError) {
    revalidatePath(`/dashboard/examen/${id}`)
    redirect(`/dashboard/examen/${id}?message=La pregunta se ha creado correctamente!`)
  }
  if (!isOk && isError) {
    redirect(`/dashboard/examen/${id}?message=No se pudo crear la pregunta, ${errorMessage}&error=true`)
  }
}

export async function deleteQuestion({ token, id, examId }, formData) {
  let isOk
  let isError
  let errorMessage = ''

  try {
    const status = await api.question.delete({ token, id, examId })
    if (status === true) {
      isOk = true
      isError = false
    }
  } catch (error) {
    isError = true
    isOk = false
    errorMessage = 'No se pudo eliminar la pregunta, intentalo mas tarde'
  }

  if (isOk && !isError) {
    revalidatePath(`/dashboard/examen/${examId}`)
    redirect(`/dashboard/examen/${examId}?message=La pregunta se ha eliminado correctamente!`)
  }
  if (!isOk && isError) {
    redirect(`/dashboard/examen/${examId}?message=${errorMessage}&error=true`)
  }
}

export async function updateQuestion({ token, id, examId }, formData) {
  let isOk
  let isError
  let errorMessage = ''

  try {
    const {
      contenido, opcion1, opcion2, opcion3, opcion4, respuesta
    } = updateQuestionSchema.parse({
      contenido: formData.get('contenido'),
      opcion1: formData.get('opcion1'),
      opcion2: formData.get('opcion2'),
      opcion3: formData.get('opcion3'),
      opcion4: formData.get('opcion4'),
      respuesta: formData.get('respuesta')
    })

    const data = await api.question.update({
      token,
      id,
      exam: examId,
      contenido,
      opcion1,
      opcion2,
      opcion3,
      opcion4,
      respuesta
    })
    if (data) {
      isOk = true
      isError = false
    }
  } catch (error) {
    isError = true
    isOk = false
    if (error instanceof ZodError) {
      errorMessage = 'Campo del formulario: ' + error.issues[0].message
      console.error('Error de ZOD validation on update question', error)
    } else {
      errorMessage = 'intentalo mas tarde'
      console.error('Error updating question', error)
    }
  }

  if (isOk && !isError) {
    revalidatePath(`/dashboard/examen/${examId}`)
    redirect(`/dashboard/examen/${examId}?message=La pregunta se ha actualizado correctamente!`)
  }
  if (!isOk && isError) {
    redirect(`/dashboard/examen/${examId}?message=No se pudo actualizar la pregunta ${errorMessage}&error=true`)
  }
}

// Resolve quiz
export async function resolveAction({ token, examId }, formData) {
  let isOk
  let isError
  let errorMessage = ''
  let questions = []
  let data = null

  try {
    questions = await api.question.getQuestionsOfExam({ token, id: examId })
    for (const [id, value] of formData.entries()) {
      const index = questions.findIndex(question => question.id === Number(id))
      if (index !== -1) {
        questions[index].respuestaDada = value
      }
    }

    data = await api.exam.resolve({ token, questions })

    if (data) {
      isOk = true
      isError = false
    }
  } catch (error) {
    isError = true
    isOk = false
    errorMessage = 'No se pudo resolver el examen, intentalo mas tarde'
    console.error('Error on resolve exam', error)
  }

  if (isOk && !isError) {
    const { respuestasCorrectas, puntosMaximos } = data
    redirect(`/dashboard/resultados?message=Examen enviado!&respuestasCorrectas=${respuestasCorrectas}&puntos=${puntosMaximos}&exam=${examId}`)
  }

  if (!isOk && isError) {
    redirect(`/dashboard/resultados?message=${errorMessage}&error=true`)
  }
}
