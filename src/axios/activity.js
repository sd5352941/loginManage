import axios from "axios"

export function activityAdd(mapPoint,esInformation){
  return axios.post("/activity/add",{
    mapPoint,
    esInformation,
  })
}

export function activityQuery(data){
  return axios.post("/activity/query",{
    name:data.name,
  })
}

export function activityDelete(id){
  return axios.get("/activity/delete",{
    params:{
      id,
    }
  })
}

export function activityDesc(id){
  return axios.post("/activity/desc",{
    id,
  })
}
