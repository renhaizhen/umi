
/**
 * title: Index Page
 */
//http://loaclhost:8000/login
//react 约定式路由 
//当你在pages下面有创建就可以自动跳转到相应的页面
import React from 'react'
import { Layout , Icon , Form ,Button , Input } from 'antd'
import styles from './index.scss'
const { Content , Footer } = Layout
 const index = ({form}) => {
    return (
        <Layout>
            <Content className={styles.content}>
                 <div className={styles.form}>
                    <h1>
                        <img src={require('@/assets/logo2.png')} alt="logo2"/>管理系统
                        <Form>
                            <Form.Item>
                                {form.getFieldDecorator('username',{
                                        rules:[
                                            {
                                                required:true,
                                                message:'用户名不能为空'
                                            }
                                        ]
                                    })(
                                    <Input prefix={<Icon type="user"/>} placeholder="请输入用户名" autoFocus/>
                                    )}
                            </Form.Item>
                            <Form.Item>
                                {form.getFieldDecorator('password',{
                                    rules:[
                                        {
                                            required:true,
                                            message:'密码不能为空'
                                        }
                                    ]
                                })(
                                <Input type="password" prefix={<Icon type="lock"/>} placeholder="请输入密码" autoFocus/>
                                )}
                            </Form.Item>
                            <Form.Item>
                                <Button type="primary" style={{ width:'100%'}}>
                                    登录
                                </Button>
                            </Form.Item>
                        </Form>
                    </h1>
                 </div>
            </Content>
            <Footer className={styles.footer}>
            Copyright<Icon type="copyright"/>Heson
        </Footer>
      </Layout>
    )
}

export default Form.create()(index)