import { z } from 'zod'

export const parseRoles = (roles) => {
  // roles is a complex Object from java and it's parse into json
  const rolesText = JSON.stringify(roles).split('[')[1].split(']')[0]
  const rolesJson = JSON.parse(rolesText)
  return rolesJson.authority
}

export const ROL = {
  ADMIN: 'ROLE_ADMIN',
  USER: 'ROL_USER'
}

export const createCategorySchema = z.object({
  title: z.string().min(1, 'El titulo es requerido'),
  description: z.string().min(1, 'La descripcion es requerida'),
  token: z.string()
})
export const updateCategorySchema = createCategorySchema.omit({ token: true })
export const createRegisterSchema = z.object({
  username: z.string().min(1, 'El nombre de usuario es requerido'),
  email: z.string().email('El email no es valido'),
  password: z.string().min(8, 'La contraseña es requerida'),
  repeatPassword: z.string().min(8, 'La contraseña es requerida')
})
export const createExamSchema = z.object({
  titulo: z.string().min(1, 'El titulo es requerido'),
  descripcion: z.string().min(1, 'La descripcion es requerida'),
  puntosMaximos: z.string().min(1, 'El numero de puntos es requerido'),
  numeroDePreguntas: z.string().min(1, 'El numero de preguntas es requerido'),
  activo: z.string().or(z.nullable()),
  categoria: z.string()
})
