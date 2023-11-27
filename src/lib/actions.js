'use server'

import { z } from 'zod'

import { redirect } from 'next/navigation'
import { revalidatePath } from 'next/cache'
import { api } from './api'

const createCategorySchema = z.object({
  title: z.string().min(1, 'El titulo es requerido'),
  description: z.string().min(1, 'La descripcion es requerida'),
  token: z.string()
})
const updateCategorySchema = createCategorySchema.omit({ token: true })
const createRegisterSchema = z.object({
  username: z.string().min(1, 'El nombre de usuario es requerido'),
  email: z.string().email('El email no es valido'),
  password: z.string().min(8, 'La contraseña es requerida'),
  repeatPassword: z.string().min(8, 'La contraseña es requerida')
})

// ---------- CATEGORY ----------

export async function createCategory(formData) {
  const { title, description, token } = createCategorySchema.parse({
    title: formData.get('titulo'),
    description: formData.get('descripcion'),
    token: formData.get('token')
  })

  const res = await api.category.create({ token, title, description })

  if (!res || res == null) {
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

  const res = await api.register({ username, email, password })
  if (!res || res == null) {
    redirect('/register?message=No se pudo crear el usuario, intentelo de nuevo mas tarde&error=true')
  } else {
    redirect('/api/auth/signin?message=Usuario creado correctamente')
  }
}
