import React, { Component } from 'react'
import { Modal,Form,Input,Radio } from 'antd'
//引入高阶组件
import {withClick} from '@/utils/hoc'


const FormItem = Form.Item
const RadioGroup = Radio.Group

//表单单排格式
const formItemLayout = {
    labelCol:{span:6},
    wrapperCol:{span:14}
}


 class UserModal extends Component {
     state = {
         visible:false
     }
     handleOpenClick = () =>{
         console.log('open')
         this.setState({visible:true})
     }
     handleCancle = () => {
         this.setState({visible:false})
     }
      //校验表单输入内容
      handleOK = () =>{
        //form 校验 err失败 values 成功之后的值
        this.props.form.validateFields((err, values) => {
            if (!err) {
              //发起请求
                this.props.onOK(values).then(res=>{
                    console.log(res)
                    if(res.state==='success'){
                        this.setState({visible:false})
                    }
                })
            }
          });
     }
    render() {
        const { visible } =this.state
        const { children,addLoading,title } = this.props
        //组件克隆copy 再加上点击事件
        // console.log(this.props.form)

        //拿到当前点击行的数据
        // console.log(this.props.record)
        const {username,nickname,type} = this.props.record

        //解构验证
        const { getFieldDecorator } = this.props.form
        return (
            <>
        {withClick(children,this.handleOpenClick)}
        <Modal
          title={title}
          visible={visible}
          centered={true}
          maskClosable={true}
          onCancel={this.handleCancle}
          onOk={this.handleOK}
          confirmLoading={addLoading}
        >
          <Form>
              <FormItem label = "用户名" {...formItemLayout}>
              {getFieldDecorator('username',{
                                        rules:[
                                            {
                                                required:true,
                                                message:'用户名不能为空'
                                            }
                                        ],
                                        initialValue:username
                                    })(
                                    <Input placeholder="请输入用户名" />
                                    )}
                            </FormItem>
              <FormItem label="姓名" {...formItemLayout}>
              {getFieldDecorator('nickname',{
                                        rules:[
                                            {
                                                required:true,
                                                message:'姓名不能为空'
                                            }
                                        ],
                                        initialValue:nickname

                                    })(
                                    <Input placeholder="请输入姓名" />
                                    )}
              </FormItem>
              <FormItem label="用户类型" {...formItemLayout}>
              {getFieldDecorator('type',{
                                        rules:[
                                            {
                                                required:true,
                                                message:'用户类型不能为空'
                                            }
                                        ],
                                        // 默认选择普通用户
                                        initialValue:type,
                                    })(
                  <RadioGroup>
                      <Radio value={'0'}>
                        管理员
                      </Radio>
                      <Radio value={'1'}>
                          普通用户
                      </Radio>
                  </RadioGroup>
                  )}
              </FormItem>
          </Form>
        </Modal>
        </>
        )
    }
}

//默认值
UserModal.defaultProps = {
    title:'添加用户',
    record:{
        type:1,
        username:'',
        nickname:''
    }
}
export default Form.create()(UserModal)