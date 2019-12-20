import React from 'react'
import { Row, Col, Card ,Pagination,Tooltip,Icon,Popconfirm,Message} from 'antd'
import { connect } from 'dva'
function List({ list,page,pageSize,total,dispatch }) {
    //跳页
    const handleChangePage = current=>{
        console.log(current)
        if(current!==page) getDatas(current)
    }

    //删除周报
    const handleDelete = id =>{
        dispatch({
            type:'reports/remove',
            payload:id
        }).then(res =>{
            console.log(res)
            if(res&&res.state==='success'){
                Message.success(res.msg)
                getDatas(1)
            }else{
                Message.success(res?res.msg:'周报删除异常')
            }
        })
    }
    const getDatas = page => {
        dispatch({type:'reports/fetch',payload:{page}
    })
    }

    const colSpan = {xl:6,xxl:4,span:6}
    return (
        <div>
            <Row gutter={20}>
                {list.map(item => (
                    <Col {...colSpan}  key={item.id}>
                        <Card title={item.createTime} extra={
                            <>
                            <Tooltip placement='top' title="编辑">
                                <a href={`/reports/write/${item.id}`}>
                                    <Icon type='form'/>
                                </a>
                            </Tooltip>
                            <Popconfirm title="确认删除吗？" onConfirm = {() =>{
                                handleDelete(item.id)
                            }}>
                                <Tooltip placement='top' title="编辑">
                                <a>
                                    <Icon type='delete'/>
                                </a>
                            </Tooltip>

                            </Popconfirm>
                            </>
                        }>
                            <p className="title">{item.title}</p>
                            <p>{item.receiverName}</p>
                        </Card>
                    </Col>
                ))}
            </Row>
            {
                list.length?
                    <Pagination
                    className="globe-pagination"
                    current={page}
                    pageSize={pageSize}
                    total={total}
                    onChange={handleChangePage}
                    />:'' }
        </div>
    )
}

export default connect(({ reports }) => ({ ...reports }))(List)