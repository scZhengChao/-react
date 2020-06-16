import React, { PureComponent } from 'react'
// import { TreeNode } from 'antd/lib/tree-select'

class TreeNode extends PureComponent{
    constructor(props){
        super(props)
        this.state = {
            open:false
        }
    }

    // 只读方法 判断是否有子元素   相当于vue 的计算属性
    get isFolder(){
         return this.props.model.children && this.props.model.children.length
    }
    toggle = ()=>{
        if(this.isFolder){
            this.setState({
                open:!this.state.open
            })
        }
    }

    render(){
        return(
            <ul style={this.props.style}>
                <li>
                    {/* 内容显示 */}
                   <div onClick={this.toggle}>
                       {/* 标题 */}
                        {this.props.model.title}
                        {/* 有可能是—+  */}
                        {this.isFolder?(<span>
                            {this.state.open?' - ':' + '}
                        </span>):null}
                   </div>
                   {/* 可能存在子树 */}
                   {this.isFolder?
                        this.props.model.children.map(model=>(
                            <TreeNode 
                                style={{display:this.state.open?' ':'none'}}
                                model={model} 
                                key={model.title} 
                            />
                        ))
                   :null}
                   {this.state.open}
                </li>
            </ul>
        )
    }
}



export default class Tree extends PureComponent {

    treeData = {
        title: "Web全栈架构师",
        children: [
          {
            title: "Java架构师"
          },
          {
            title: "JS高级",
            children: [
              {
                title: "ES6"
              },
              {
                title: "动效"
              }
            ]
          },
          {
            title: "Web全栈",
            children: [
              {
                title: "Vue训练营",
                expand: true,
                children: [
                  {
                    title: "组件化"
                  },
                  {
                    title: "源码"
                  },
                  {
                    title: "docker部署"
                  }
                ]
              },
              {
                title: "React",
                children: [
                  {
                    title: "JSX"
                  },
                  {
                    title: "虚拟DOM"
                  }
                ]
              },
              {
                title: "Node"
              }
            ]
          }
        ]
    };

    render() {
        return (
            <div>
                <TreeNode model={this.treeData}></TreeNode>
            </div>
        )
    }
}
