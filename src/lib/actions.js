'use server'

import { redirect } from 'next/navigation'
import { revalidatePath } from 'next/cache'
import { api } from './api'
import { createCategorySchema, createExamSchema, createQuestionSchema, createRegisterSchema, updateCategorySchema, updateExamSchema, updateQuestionSchema } from './utils'
import { ZodError } from 'zod'

// ---------- CATEGORY ----------

export async function createCategory(formData) {
  const { title, description, token } = createCategorySchema.parse({
    title: formData.get('titulo'),
    description: formData.get('descripcion'),
    token: formData.get('token')
  })

  const data = await api.category.create({ token, title, description })

  if (!data || data == null) {
    redirect('/dashboard/categoria/create?message=No se pudo crear la categoria, intentelo de nuevo mas tarde&error=true')
  } else {
    revalidatePath('/dashboard/categoria')
    redirect(`/dashboard/categoria?message=La categoria ${title} se ha creado correctamente`)
  }
}

export async function deleteCategory({ token, id }, formData) {
  // usar try catch aca asi no tengo que usar el IF y lo hago en el catch
  const status = await api.category.delete({ token, id })
  if (status === false) {
    redirect(`/dashboard/categoria/${id}?message=No se pudo eliminar la categoria, intentelo de nuevo mas tarde&error=true`)
  } else {
    revalidatePath('/dashboard/categoria')
    redirect('/dashboard/categoria?message=Elemento fue eliminado correctamente')
  }
}

export async function updateCategory({ token, id }, formData) {
  const { title, description } = updateCategorySchema.parse({
    title: formData.get('titulo'),
    description: formData.get('descripcion')
  })

  const data = await api.category.update({ token, id, title, description })
  if (!data) {
    redirect(`/dashboard/categoria/${id}?message=No se pudo actualizar la categoria, intentelo de nuevo mas tarde&error=true`)
  } else {
    revalidatePath('/dashboard/categoria')
    redirect(`/dashboard/categoria/${id}?message=La categoria ${title} se ha actualizado correctamente`)
  }
}

// ---------- REGISTER ----------
export async function register(formData) {
  const { username, password, email, repeatPassword } = createRegisterSchema.parse({
    username: formData.get('username'),
    password: formData.get('password'),
    email: formData.get('email'),
    repeatPassword: formData.get('repeatPassword')
  })

  if (password !== repeatPassword) {
    redirect('/register?message=Las contraseñas no coinciden&error=true')
  } else if (password.lenght < 8) {
    redirect('/register?message=La contraseña debe tener al menos 8 caracteres&error=true')
  }

  const data = await api.register({ username, email, password })
  if (!data || data == null) {
    redirect('/register?message=No se pudo crear el usuario, intentelo de nuevo mas tarde&error=true')
  } else {
    redirect('/api/auth/signin?message=Usuario creado correctamente')
  }
}

// ---------- EXAM ----------
export async function createExam({ token }, formData) {
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

  if (!data || data == null) {
    redirect('/dashboard/examen?message=No se pudo crear el examen, intentelo de nuevo mas tarde&error=true')
  } else {
    revalidatePath('/dashboard/examen')
    redirect('/dashboard/examen?message=El examen se ha creado correctamente!')
  }
}

export async function deleteExam({ token, id }, formData) {
  const status = await api.exam.delete({ token, id })
  if (status === false) {
    redirect('/dashboard/examen?message=No se pudo eliminar el examen, intentelo de nuevo mas tarde&error=true')
  } else {
    revalidatePath('/dashboard/examen')
    redirect('/dashboard/examen?message=El examen se ha eliminado correctamente!')
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
