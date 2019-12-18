import {fetch} from 'dva'
import { notification } from 'antd'
import router from 'umi/router'


const codeMessage = {
    //200-204成功
    200:'服务器成功返回请求数据',
    201:'新建或修改数据成功',
    202:'一个请求已经进图后台排队（异步任务）',
    204:'删除数据成功',
    //300-重定向之类的
    //400- 客户端问题
    400:'发出的请求错误，服务器没有进行新建或修改数据操作',
    401:'用户没有权限（令牌、用户名、密码错误）',
    403:'用户得到授权，但是访问禁止',
    404:'资源不存在，服务器没有进行操作',
    406:'请求格式不可得',
    410:'请求的资源被永久删除，且不会再得到',
    422:'当创建一个对象时，发生验证错误',
    //500- 服务端问题
    500:'服务器错误',
    502:'网关错误',
    503:'服务器暂时过载或维护',
    504:'网关超时'
}
/**
 * 
 * @param {用户名} params.username 
 * @param {密码} params.pwd 
 * 
 */
//url 外部调用传递过来
export default async function request(url,options){
    return await fetch(url,{
        ...options,
        //下面的方法可能会变化，所以也是请求外部写
        // method:"POST",
        // body:JSON.stringify(params),
        headers:{
            "Content-type":"application/json"
        },
    })
    .then(checkStates)
    .catch(checkErrorStates)
}

function checkStates (res){
    if(res.status>=200&&res.status<300){
        return res.json()
    }
    const errText = codeMessage[res.status] || res.statusText

    //错误信息提醒
    notification.error({
        message:`请求错误${res.status}${res.url}`,
        description:errText
    })
    // 抛出异常
    const error = new Error(errText);
    error.name = res.status
    error.response = res
    throw error
}

function checkErrorStates(err) {
    if(err && err.response){
        //拿到异常状态
        const { status } = err.response
        if(status === 403){
            router.push('/exception/403')
        }
        if(status <= 504 && status >= 500){
            router.push('/exception/500')
        }
        if(status <= 422 && status >= 404){
            router.push('/exception/404')
        }
    }
}