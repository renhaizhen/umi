
/**
 * title: Index Page
 */
//http://loaclhost:8000/login
//react 约定式路由 
//当你在pages下面有创建就可以自动跳转到相应的页面
import React from 'react'
// import { login } from './service/login'
import router from 'umi/router'
import jwt_decode from 'jwt-decode'
import { Layout, Icon, Form, Button, Input, Message } from 'antd'
import styles from './index.scss'
import { connect } from 'dva'

const { Content, Footer } = Layout

const index = ({ form ,dispatch ,loading}) => {
    //校验表单输入内容
    const handleSubmit = () => {
        //form 校验 err失败 values 成功之后的值
        form.validateFields((err, values) => {
            if (!err) {
                dispatch({
                    type:'login/login',
                    payload:values}).then( res=>{
                    //解析token
                    if (res && res.state === 'suc') {
                        const token = jwt_decode(res.token)
                        const { id, nickname, username, type } = token
                        localStorage.setItem('username', username)
                        localStorage.setItem('nickname', nickname)
                        localStorage.setItem('userId', id)
                        localStorage.setItem('userType', type === '0' ? 'admin' : 'user')
                        router.push('/')
                        console.log(token)
                    }else{
                        Message.error(res ? res.msg:'登录失败')
                    }
                }

                )

                //console.log('Received values of form: ', values);
                //发起请求
                // login(values)
                //     .then(res => {
                //         console.log(res)
                //         //解析token
                //         if (res && res.state === 'suc') {
                //             const token = jwt_decode(res.token)
                //             const { id, nickname, username, type } = token
                //             localStorage.setItem('username', username)
                //             localStorage.setItem('nickname', nickname)
                //             localStorage.setItem('userId', id)
                //             localStorage.setItem('userType', type === '0' ? 'admin' : 'user')
                //             router.push('/')
                //             console.log(token)
                //         }else{
                //             Message.error(res ? res.msg:'登录失败')
                //         }
                //     }
                //     )

            }
        });
    }
    return (
        <Layout>
            <Content className={styles.content}>
                <div className={styles.form}>
                    <h1>
                        <img src={require('@/assets/logo2.png')} alt="logo2" />管理系统
                        <Form>
                            <Form.Item>
                                {form.getFieldDecorator('username', {
                                    rules: [
                                        {
                                            required: true,
                                            message: '用户名不能为空'
                                        }
                                    ]
                                })(
                                    <Input prefix={<Icon type="user" />} placeholder="请输入用户名" autoFocus />
                                )}
                            </Form.Item>
                            <Form.Item>
                                {form.getFieldDecorator('password', {
                                    rules: [
                                        {
                                            required: true,
                                            message: '密码不能为空'
                                        }
                                    ]
                                })(
                                    <Input type="password" prefix={<Icon type="lock" />} placeholder="请输入密码" autoFocus />
                                )}
                            </Form.Item>
                            <Form.Item>
                                <Button onClick={handleSubmit} type="primary" style={{ width: '100%' }} loading={loading}>
                                    登录
                                </Button>
                            </Form.Item>
                        </Form>
                    </h1>
                </div>
            </Content>
            <Footer className={styles.footer}>
                Copyright<Icon type="copyright" />Heson
        </Footer>
        </Layout>
    )
}

export default connect(({loading})=>({loading:
    loading.effects['login/login']
})) (Form.create()(index))