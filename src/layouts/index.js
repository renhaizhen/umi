import './index.scss'
//引入组件
import Header from './Header'
import Footer from './Footer'
//引入antd ui
import {Layout} from 'antd'
//解构Layout
const { Content } = Layout
//解构props
function BasicLayout({ children }) {
  return (
    <Layout className="basic-layout">
      <Header/>
      <Content>
        {children}
      </Content>
      <Footer/>
    </Layout>
  );
}

export default BasicLayout;
