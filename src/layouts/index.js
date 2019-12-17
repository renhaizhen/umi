import './index.scss'
//引入组件
import Header from './Header'
import Footers from './Footer'
//引入antd ui
import {Layout} from 'antd'
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
    <Layout className="basic-layout">
      <Header/>
      <Content className="content">
        {children}
      </Content>
      <Footers/>
    </Layout>
  );
}

export default BasicLayout;
