/**
 * title:用户
 */
import React from 'react'
import {Button,Message} from 'antd'
import {Content,Tool} from '@/components/Layout'
import Table from '@/components/Table'
import { connect } from 'dva'
import UserModal from './components/UserModal'

// 提供了请求loading 请求完成之前为true 完成之后为false
 const index = ({list,dispatch,loading,addLoading,total,page,pageSize}) =>{
     // fetch().then(res=>console.log(res))
     // columns 表头
    const columns = [
        {
            title: '用户名',
            dataIndex: 'username',
            key: 'username',
            width: '25%',
          },
          {
            title: '姓名',
            dataIndex: 'nickname',
            key: 'nickname',
            width: '25%',
          },
          {
            title: '用户类型',
            dataIndex: 'type',
            key: 'type',
            width: '25%',
            render: text => <span>{text === '0' ? '管理员' : '普通用户'}</span>,
          },
          {
            title: '操作',
            key: 'operation',
            render: (text, record) => (
              <div>
                <UserModal onOK={value=>handleEdit(record.id,value)}
                 title='编辑用户' 
                 record={record}>
                  <a>编辑</a>
                  <a> 删除</a>
                </UserModal>
              </div>
            ),
          },
      ];
      // console.log(loading,addLoading)
    const reload = () => {
      dispatch({type:'users/fetch',payload:{page:1}})
    }
    const handleAdd =(values) =>{
      // console.log(values)
      return  dispatch({type:'users/add',payload:values}).then(res=>{
        if(res && res.state==="success"){
          Message.success(res.msg)
          //reload
          reload()
          return res
        }else{
          Message.error('添加用户失败')
        }
      })
    }

    //分页跳转
    const handlePageChange = pageNum=>{
      // console.log(pageNum)
      if(page!=pageNum){
        dispatch({type:'users/fetch',payload:{page:pageNum}}).then(res=>{
          if(res && res.state==="success"){
            Message.success(res.msg||'编辑用户成功')
            //reload
            reload()
            return res
          }else{
            Message.error('编辑用户失败')
          }
        })
      }
    }

    //编辑
    const handleEdit = (id,value)=>{
      console.log(value,id)
      return dispatch({type:'users/edit',payload:{id,value}})
    }
    return (
        <Content>
            <Tool>
                <UserModal onOk={handleAdd} addLoading={addLoading}>
                  <Button type="primary">添加用户</Button>
                </UserModal>
            </Tool>
            <Table 
             rowKey={(list,index)=>list.id}
             columns={columns} 
             dataSource = {list} 
             loading={loading}
             pagination={{
               total:total,
               pageSize:pageSize,
               current:page,
               onChange:handlePageChange
             }}
             />
        </Content>
    )
}

//models可以调用serives  index可以调用使用connect关联models

export default connect( ({users,loading}) => ({
  ...users,
  loading:loading.effects["users/fetch"],
  addLoading:loading.effects["users/add"]

}) )(index)