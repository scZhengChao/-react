import React, { PureComponent } from 'react'

// Dialog定义组件外观和行为
function Dialog(props){
    //这里的props.children 就代表了默认的内容  是一个合法的表达式申请
    // 注意了 这里的 props.children 不一定是数组，有可能是对象；取决于包含组件的开始和结束标记之间的内容
    // slot 
    // 备选消息  
    const messages = {      
        "foo": {title: 'foo', content: 'foo~'},      
        "bar": {title: 'bar', content: 'bar~'},  
    }
    console.log(props)

    const {def,footer} = props.children[1](messages[props.msg])

     return (
        <div style={{ border: "1px solid blue" }}>
            {/* {props.children[1].def}
            {props.children[1].footer} */}
            {def}
            {footer}
        </div>
    ); 
}


function RadioGroup(props){
    return (
        <div>
            {/* 不行jsx 是只读的；不能修改 */}
            {/* {props.children.forEach(radio=>radio.props.name)} */}

            {React.Children.map(props.children,radio=>{
                // 要修改虚拟dom 或者jsx 编译的结果 只能去克隆
                // 参数一是克隆对象 参数二是设置的属性
                return React.cloneElement(radio,{name:props.name})
            })}
        </div>
    )
}


function Radio({children,...rest}){
    return (
        <label>
            <input type="radio"  {...rest} />
            {children}
        </label>
    )
}


export default class composition extends PureComponent {
    render() {
        return (
            <div>
                {/* 传入显示内容 */}      
                <Dialog msg='foo'>       
                    {/* 一切合法的表达式  */}
                    {
                        ({title,content})=>({
                            def:(
                                <>
                                    {/* 作用域插槽 */}
                                    <h1>组件复合</h1>        
                                    <p>复合组件给与你足够的敏捷去定义自定义组件的外观和行为</p> 
                                </>
                            ),
                            footer:<button onClick={()=>console.log('react slot')} >slot</button>
                        })
                    }   
                        
                </Dialog>
                <RadioGroup name="mvvm">
                    <Radio value="vue">vue</Radio>
                    <Radio value="react">react</Radio>
                    <Radio value="ng">angular</Radio>
                </RadioGroup>
            </div>
        )
    }
}
