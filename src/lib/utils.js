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
