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
