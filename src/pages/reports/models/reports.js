import * as reportsService from '../service/reports'

export default {
    namespace: 'reports',
    state: {
        allUsersList:[],
        list:[],
        total:0,
        page:1,
        pageSize:5,
        info:{
          content:'<p><br></p>'
        }
    },
    reducers: {
      setData(state,{payload}) {
           return {...state,allUsersList:payload} 
        },
      setReport(state,{payload:{list,total,page}}){
        return {...state,list,total,page}
      },
      setInfo(state,{payload}){
        return {...state,info:payload}
      }
    },
    effects: {
      *getAllUsers({ _ }, { call, put }) {
        const res = yield call(reportsService.fetchAllusers);
        console.log(res)
        if(res && res.state==="success"){
            yield put({ type: 'setData',payload:res.data });
        }else{
            yield put({ type: 'setData',payload:{allUsersList:[]} });
        }
      },
      *add({payload},{call}){
          //这里只是调用 发放要写在service里面
        //   console.log(payload)
          return yield call(reportsService.add,payload)
      },
      *fetch({payload:{page} }, { call, put,select }) {
        //   console.log(page)
        const pageSize = yield select(state => state.reports.pageSize)
        //可以使用select 取到外部的pagesize yield取不到
        const res = yield call(reportsService.fetchMyReports, {page,pageSize});
        console.log(res)
        if(res && res.state==="success"){
            yield put({ type: 'setReport',payload:{...res.data,page} });
        }else{
            yield put({ type: 'setReport',payload:{list:{list:[],total:0,page:1}} });
        }
      },
      *fetchInfo({payload},{call,put}){
        const res = yield call(reportsService.fetchInfo,payload)
        console.log(res)
        if(res && res.state==="success"){
          yield put({ type: 'setInfo',payload:{...res.data} });
      }else{
          yield put({ type: 'setInfo',payload:{} });
      }
      },
      *update({payload},{call}){
        return yield call(reportsService.update,payload)
      },
      *remove({payload},{call}){
        return yield call(reportsService.remove,payload)
      },
    },
    //dva 订阅模式可自执行函数
    subscriptions:{
      setup({dispatch,history}){
        //首先判断当前的路径
        return history.listen(({pathname}) => {
            if(pathname === "/reports"){
                //dispatch 调用时可传参
                dispatch({type:'fetch',payload:{page:1}})
            }
        })
    }
    }
}