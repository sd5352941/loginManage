import axios from "axios"

export function login(data){
  return axios.post("/member/login",{
    username:data.username,
    password:data.password,
})
}

export function register(data){
  return axios.post("/member/register",{
    username:data.registerName,
    name:data.name,
    password:data.registerPsw,
  })
}
