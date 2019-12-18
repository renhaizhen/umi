import styles from './index.scss'

//代码抽离
//内容容器 className用来接收类名，...rest接收剩下的子集
export const Content = ({className, ...rest}) =>(
    <div className={`${styles['content-wrapper']}${className}`} 
    {...rest} />
)



export const Tool = ({className, ...rest}) =>(
    <div className={`${styles['tool-wrapper']}${className}`} 
    {...rest} />
)