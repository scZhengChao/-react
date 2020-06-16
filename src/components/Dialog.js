import React, { Component } from 'react'
import { createPortal,unmountComponentAtNode,unstable_renderSubtreeIntoContainer } from 'react-dom'

export  class Dialog extends Component {
    constructor(props){
        super(props)
        this.node = document.createElement('div')
        document.body.appendChild(this.node)
    }

    render() {
        //将createPortal参数一申明的jsx 挂载在 node上
        return createPortal((
            <div>
                {this.props.children}
            </div>
        ),this.node)
    }
    //
    componentWillUnmount(){
        document.body.removeChild(this.node)
    }
}


export   class Dialog2 extends React.Component {  
    //渲染一个空 什么都不渲染
    render() {    
        return null;  
    }
 
    componentDidMount() {    
     //首次挂载  创建数组
        const doc = window.document;    
        this.node = doc.createElement("div");    
        doc.body.appendChild(this.node);
        this.createPortal(this.props);  
    }
    componentDidUpdate() {    
        this.createPortal(this.props);  
    }
    componentWillUnmount() {   
        //清理节点 
        unmountComponentAtNode(this.node);    
        window.document.body.removeChild(this.node);  
    }
 
    createPortal(props) {    
     //作用是从 参数一 父组件 参数二 传送内容  参数三： 传送目标
        unstable_renderSubtreeIntoContainer(      
            this, //当前组件      
            <div className="dialog">{props.children}</div>, // 塞进传送门的JSX      
            this.node // 传送门另一端的DOM node    
        );  
    } 
}
