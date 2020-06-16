import React, { Component } from 'react'
import {createBrowserHistory } from 'history'

import matchPath from './matchPath'


//创建一个上下文保存history，location 等 这个地方有点像store里的state似的
const RouterContext = React.createContext()


//Router: 管理历史记录变更，location变更等等，并传递给后代
class BrowserRouter extends Component {
    constructor(props){
        super(props)
        // 创建浏览器history对象
        this.history = createBrowserHistory(this.props)

        // 创建状态 管理location 
        this.state = {
            location:this.history.location
        }

        //开启监听  下面的所有子组件 都会更新
        this.unlisten = this.history.listen(location=>{
            this.setState({location})
        })
    }

    componentWillUnmount(){
        if(this.unlisten){
            this.unlisten()
        }
    }
    render(){
        return (
            <RouterContext.Provider 
                value={{
                    history:this.history,
                    location:this.state.location
                }}
                children={this.props.children}
            >

            </RouterContext.Provider>
        )
    }
}


//根据传参配置（path,render,componet,children 之间有竞争关系的）  渲染出组件
class Route extends Component{
    render(){
        return (
            <RouterContext.Consumer>
                {/* 这里的context 就是 provider 的value */}
                {context=>{
                    const location = context.location
                    //根据pathname和用户传递的props获得mach对象
                    const match = matchPath(location.pathname,this.props)

                    //传递一些参数
                    const props = {...context,match};

                    //children > component > render 
                    //3者之间的竞争关系
                    // 如果 path 匹配url 的情况： component 和 render 都会执行
                    // 但是children 是匹不匹配 都会执行

                    let {children , component , render } = this.props
                 
                    if(children && typeof children === 'function'){
                        children = children(props)
                    }

                    return (
                        // 提高上下文的优先级；从里往外找；把更新过得props三兄弟传给Context上下文；只是Provider 的value，之前的value改变不了
                        <RouterContext.Provider value={props}>
                            {
                                children  // children 优先级最高，无论匹配与否都执行
                                ?children
                                        :props.match  // 后面的component和render必须匹配
                                        ?component //若匹配首先查找component
                                                ?React.createElement(component) // 若它存在渲染之
                                                    :render // 若render选项存在
                                                    ?render(props) // 按render渲染结果
                                                    :null
                                        :null
                            }
                        </RouterContext.Provider>
                    )
                }}
            </RouterContext.Consumer>
        )
    }

}

class Link extends React.Component {  
    handleClick(event, history) {    
        event.preventDefault();    
        history.push(this.props.to);  
    }
 
    render() {    
        const { to, ...rest } = this.props; 
        return (
            <RouterContext.Consumer>        
        {/* match location history */}
                {context => {          
                    return (            
                    <a  
                        {...rest}              
                        onClick={event => this.handleClick(event, context.history)}              
                        href={to}            
                    >              
                        {this.props.children}           
                    </a>          
                    );        
                }}      
            </RouterContext.Consumer>    
        );  
    } 
}



export class MyRouterTest extends Component {
    render() {
        return (
            <BrowserRouter>
                <Link to="/foo">foo</Link>
                <Link to="/bar">bar</Link>
                <Link to="/mua/abc">mua</Link>
                <Route path='/foo' component={(props)=><div>foo</div>}></Route>
                <Route path='/bar' component={(props)=><div>bar</div>}></Route>
                <Route path="/mua/:ns" render={({ match }) => match.params.ns} />
                <Route children={
                    //函数 数组 jsx
                    ({location})=> 'xxx'
                }></Route>
            </BrowserRouter>
        )
    }
}

export default MyRouterTest
