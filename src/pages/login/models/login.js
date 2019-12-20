import * as loginService from '../service/login'

export default {
    namespace:'login',
    state:{
        info:{}
    },
    effects:{
        *login({payload},{call}){
           return yield call(loginService.login,payload) 
        }
    }
}