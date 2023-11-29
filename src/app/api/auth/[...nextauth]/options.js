import { api } from '@/lib/api'
import { parseRoles } from '@/lib/utils'
import CredentialsProvider from 'next-auth/providers/credentials'

export const options = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',

      credentials: {
        username: { label: 'Username', type: 'text', placeholder: 'jsmith' },
        password: { label: 'Password', type: 'password', placeholder: '**********' }
      },

      async authorize(credentials, req) {
        const { username, password } = credentials
        const res = await api.login('login', { username, password })

        if (!res.ok) {
          console.error({ message: res.statusText })
          throw res.statusText
        }

        const data = await res.json()
        const roles = parseRoles(data.roles)

        const user = { ...data, roles }
        return user
      }
    })
  ],
  callbacks: {
    async jwt({ token, user }) {
      return { ...token, ...user }
    },
    async session({ session, token, user }) {
      session.user = token
      return session
    }
  },
  pages: {
    signIn: '/login',
    error: '/login/error'
  }
}
