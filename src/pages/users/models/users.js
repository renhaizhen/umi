import * as userService from '../serivce/users'

export default {
    namespace: 'users',
    state: {
        list:[],
        total:0,
        page:1,
        pageSize:5
    },
    reducers: {
      setData(state,{payload:{list,total,page}}) {
           return {...state,list,total,page} 
        },
    },
    effects: {
      *fetch({payload:{page} }, { call, put,select }) {
        //   console.log(page)
        const pageSize = yield select(state => state.users.pageSize)
        //可以使用select 取到外部的pagesize yield取不到
        const res = yield call(userService.fetch, {page,pageSize});
        console.log(res)
        if(res && res.state==="success"){
            yield put({ type: 'setData',payload:{...res.data,page} });
        }else{
            yield put({ type: 'setData',payload:{data:{list:[],total:0}} });
        }
        const list = yield select(state => state.users.list)
        console.log(list)
      },
      *add({ payload }, { call }) {
        return yield call(userService.add, payload);
      },
      *edit({ payload:{id,value} }, { call }) {
        return yield call(userService.edit, id,value);
      },
    },
    //dva 订阅模式可自执行函数
    subscriptions:{
        setup({dispatch,history}){
            //首先判断当前的路径
            return history.listen(({pathname}) => {
                if(pathname === "/users"){
                    //dispatch 调用时可传参
                    dispatch({type:'fetch',payload:{page:1}})
                }
            })
        }
    }
}