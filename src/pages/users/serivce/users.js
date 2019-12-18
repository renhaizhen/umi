import request from '@/utils/request'

export function fetch({page,pageSize}){
    // console.log(page,pageSize)
    return request(`/api/users/get_users/${page}/${pageSize}`)
}

//异常处理放到统一的 utils/request.js