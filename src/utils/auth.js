const TokenKey = 'Admin-Token'
const Name = 'name'

export function getToken() {
  return localStorage.getItem(TokenKey)
}

export function setToken(token) {
  return localStorage.setItem(TokenKey,token)
}

export function removeToken() {
  return localStorage.removeItem(TokenKey)
}

export function setName(name) {
  return localStorage.setItem(Name,name)
}

export function getName(name) {
  return localStorage.getItem(Name)
}
