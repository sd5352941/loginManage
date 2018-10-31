import request from '@/utils/request'

export function activityAdd(mapPoint, information) {
  return request({
    url: '/activity/add',
    method: 'post',
    data: {
      mapPoint,
      information
    }
  })
}


