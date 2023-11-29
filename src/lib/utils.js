import { z } from 'zod'

export const parseRoles = (roles) => {
  // roles is a complex Object from java and it's parse into json
  const rolesText = JSON.stringify(roles).split('[')[1].split(']')[0]
  const rolesJson = JSON.parse(rolesText)
  return rolesJson.authority
}

export const validatePassword = (password, repeatPassword) => {
  let isValidPassword = true
  let message = ''
  if (password !== repeatPassword) {
    isValidPassword = false
    message = 'Las contraseñas no coinciden'
  }
  if (password.length < 8) {
    isValidPassword = false
    message = 'La contraseña debe tener al menos 8 caracteres'
  }
  return { isValidPassword, message }
}

export const ROL = {
  ADMIN: 'ROLE_ADMIN',
  USER: 'ROLE_USER'
}

// category
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

// exam
export const createExamSchema = z.object({
  titulo: z.string().min(1, 'El titulo es requerido'),
  descripcion: z.string().min(1, 'La descripcion es requerida'),
  puntosMaximos: z.string().min(1, 'El numero de puntos es requerido'),
  numeroDePreguntas: z.string().min(1, 'El numero de preguntas es requerido'),
  activo: z.string().or(z.nullable()),
  categoria: z.string()
})
export const updateExamSchema = createExamSchema

// question
export const createQuestionSchema = z.object({
  contenido: z.string().min(1, 'El contenido es requerido'),
  respuesta: z.string().min(1, 'La respuesta es requerida'),
  opcion1: z.string().min(1, 'La opcion 1 es requerida'),
  opcion2: z.string().min(1, 'La opcion 2 es requerida'),
  opcion3: z.string().min(1, 'La opcion 3 es requerida'),
  opcion4: z.string().min(1, 'La opcion 4 es requerida')
})
export const updateQuestionSchema = createQuestionSchema
