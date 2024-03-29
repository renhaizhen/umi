//克隆子元素BUtton并添加事件 higher order components
export const withClick = (element, handleClick = () =>{}) => {
    if(!element) return

    //判断元素是否是DOM对象 如果是对象的话，那么重组 否则返回span元素
    if(Object.prototype.toString.call(element)==='[object Object]'){
        return <element.type {...element.props} onClick={handleClick} />
    }
return <span onClick={handleClick}>{element}</span>
}