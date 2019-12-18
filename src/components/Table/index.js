import './index.scss'
import { Table } from 'antd'
//代码抽离
//内容容器 className用来接收类名，...rest接收剩下的子集
const index = ({className, ...rest}) =>(
    <Table className={`table-wrapper ${className}`} 
    {...rest} />
)

export default index