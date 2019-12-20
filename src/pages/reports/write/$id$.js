/**
 * title: 写周报
 * Routes:
 *   - ./src/routes/PrivateRoute.js
 * authority: ["admin","user"]
 */

import React, { Component } from 'react'
import { Input, Form, Select, Button, Message } from 'antd'
import { Content } from '@/components/Layout'
import Editor from 'wangeditor'
import {connect} from 'dva'
import router from 'umi/router'
class $id$ extends Component {
    //存储编辑状态
    constructor(props) {
        super(props)
        //拿到id
        this.id = props.match.params.id
        this.state = {
            editorContent:'',
            editorCheck:true
        }
    }
    componentDidMount(){
        if(this.id){
            //编辑 要拿到数据
            this.getDatas().then(()=>{
                console.log(this.props.info)
                const { content} = this.props.info
                this.setState({
                    editorContent:content
                })
                this.initEditor()
            })
        }else{
            this.initEditor()
        }
        this.getAllusers()
    }

    //点击的数据
     getDatas(){
       return this.props.dispatch({
            type:'reports/fetchInfo',
            payload:this.id
        })
    }

    //获取所有用户信息
    getAllusers(){
        //请求完.then调用保证状态已经更新
        this.props.dispatch({
            type:'reports/getAllUsers'
        }).then(res=>{
            this.renderUsers()
        })
    }
    //重写用户信息
    renderUsers(){
        const { allUsersList } = this.props
        // console.log(allUsersList)
        return (
            <Select placeholder="请选择接收人">
                {allUsersList.map(({username,nickname},index) => [
                    <Select.Option value={username} key={index}>
                        {nickname}
                    </Select.Option>
                ])}
            </Select>
        )
     }
    //实例化编辑器
    initEditor(){
        const editor = new Editor(this.refs.editorRef)
        //监听内容 发现返回的是标签
        //<p>test</p>
        editor.customConfig.onchange = html =>{
             console.log(html)
            //校验输入的内容不能为空
            let editorCheck =true

            if(!html || html==="<p><br></p>"){
                editorCheck = false
            }
            this.setState({
                editorContent:html,
                editorCheck:editorCheck
            })
            }
        editor.create()
    }
      // 提交周报
  handleOk = () => {
    const { editorCheck, editorContent } = this.state;
    // 表单校验
    this.props.form.validateFields((err, value) => {
      if (!err) {
        // 校验编辑器
        if (editorContent && editorCheck) {
          // 发起请求
          // console.log(value, editorContent);
          this.props
            .dispatch({
              type: this.id ? 'reports/update' : 'reports/add',
              payload: { ...value, content: editorContent, id: this.id },
            })
            .then(res => {
              if (res && res.state === 'success') {
                Message.success(res.msg || '周报提交成功');
                router.push('/reports');
              } else {
                Message.error(res.msg || '周报提交失败');
              }
            });
        } else {
          this.setState({
            editorCheck: false,
          });
        }
      }
    });
  };
    render() {
        //解构验证
        const { getFieldDecorator } = this.props.form
        const {editorCheck} = this.state
        const {title,receiverName,content} = this.props.info
        return (
            <Content>
                <Form>
                    <Form.Item label="标题">
                      {getFieldDecorator('title',{
                                        rules:[
                                            {
                                                required:true,
                                                message:'标题不能为空'
                                            }
                                        ],
                                        initialValue:title
                                    })(
                                    <Input autoComplete="off" placeholder="请输入周报标题"/>
                                    )}
                     </Form.Item>
                    <Form.Item label="接收人">
                    {getFieldDecorator('username',{
                                        rules:[
                                            {
                                                required:true,
                                                message:'用户名不能为空'
                                            }
                                        ],
                                        initialValue:receiverName
                                    })(this.renderUsers())}
                     </Form.Item>
                     <Form.Item label="内容" required>
                         <div ref= "editorRef" style={!editorCheck ? {border:'1px red solid'}: {border:'1px #eee solid'}} 
                         dangerouslySetInnerHTML={{__html:content}} />
                         {!editorCheck && <p style={{color:'red'}}>内容不能为空</p>}
                     </Form.Item>
                    <Form.Item className="action">
                        <Button>取消</Button>
                        <Button onClick={this.handleOk} type="primary">提交</Button>

                    </Form.Item>
                </Form>
            </Content>
        )
    }
}

export default connect(({reports}) => ({...reports})) (Form.create()($id$))