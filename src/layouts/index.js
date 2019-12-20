import './index.scss'
//引入组件
import Header from './Header'
import Footers from './Footer'
//引入antd ui
//ConfigProvider 国际化 需要引入相应的语言
import zh_CN from 'antd/es/locale/zh_CN'
import {Layout , ConfigProvider} from 'antd'
//解构Layout
const { Content } = Layout
//解构props
function BasicLayout({ children,location }) {
  // console.log(children,location)
  // 全局布局 登录页面 
  if(location.pathname==="/login"){
    return children
  }
  return (
    <ConfigProvider locale = {zh_CN}>
    <Layout className="basic-layout">
      <Header/>
      <Content className="content">
        {children}
      </Content>
      <Footers/>
    </Layout>
    </ConfigProvider>

  );
}

export default BasicLayout;
