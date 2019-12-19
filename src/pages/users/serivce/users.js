import request from '@/utils/request'

export function fetch({page,pageSize}){
    // console.log(page,pageSize)
    return request(`/api/users/get_users/${page}/${pageSize}`)
}

//添加用户
export function add(params) {
    // 发起请求 https://cjy-react-interface.herokuapp.com/api/users/add_user
    // console.log(params);
    return request(`/api/users/add_user`, {
      method: 'POST',
      body: JSON.stringify(params),
    });
  }

  /**
 * 编辑用户
 * @param {用户id} id
 * @param {用户名} params.username
 * @param {姓名} params.nickname
 * @param {用户类型} params.type
 */
export function edit(id, params) {
  // 发起请求 https://cjy-react-interface.herokuapp.com/api/users/edit_user
  console.log(id, params);
  return request(`/api/users/edit_user/${id}`, {
    method: 'POST',
    body: JSON.stringify(params),
  });
}


//异常处理放到统一的 utils/request.js