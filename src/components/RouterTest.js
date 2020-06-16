import React, { PureComponent } from 'react'
import {BrowserRouter,Link,Route,Switch,Redirect  } from 'react-router-dom'

function ProductList(){
    return (
        <div>
            <h3>ProductList</h3>
            <Link to='/detail/web'>react router </Link>
        </div>
    )
}
function ProductMgt(props){
    return (
        <div>
            <h3>ProductMgt</h3>
            {/* 最重要的体现出来了；router 即 router-view；更加简单的嵌套；一切皆组件;非常直观的嵌套 即写即用*/}
            <Link to='add'>新增</Link>
            <Link to='/management/searce'>搜索</Link>
            {/* path='add'  不行*/}
            <Route  exact path='/management/add' component={()=><div>add</div>}></Route>
            <Route exact path='/management/searce' component={()=><div>search</div>}></Route>
            {/* 利用redirect 做一个默认展示 */}
            <Redirect to='/management/add'></Redirect>
        </div>
    )
}

function Detail({match,history,location}){
    return (
        <div>
            <h3>Detail</h3>
            {match.params.name}
            <button onClick={history.goBack}>后退</button>
        </div>
    )
}



//路由守卫核心思想：通过高阶组件包装Route得到一个PrivateRoute
//路由守卫没有vue 那么多封装好的乱七八糟的钩子；
// 小写不能用于组件jsx的渲染
function PrivateRoute({component:Component,isLogin,...rest}){


    return (
        <Route {...rest} render={
            // match,history,location
            props=>isLogin?(
                <Component/>
            ):(
                <Redirect to={{
                    pathname:'/login',
                    state:{redirect:props.location.pathname}
                }}></Redirect>
            )
        }></Route>
    )
}



class RouterTest extends PureComponent {
    render() {
        return (
<BrowserRouter>
    <nav>
        <Link to='/'>商品列表</Link>
        <Link to='/management'>商品管理</Link>
    </nav>

    {/* 排他性；唯一匹配 */}
    <Switch>
        {/* 路由配置 */}
        {/* react-router匹配不是独占的； */}
        <Route exact path='/' component={ProductList}></Route>
        {/* <Route  path='/management' component={ProductMgt}></Route> */}
        <PrivateRoute path='/management' component={ProductMgt} isLogin={Math.random()>0.5?true:false}></PrivateRoute>
        <Route  path='/login' component={()=><div>login page</div>}></Route>
        <Route  path='/detail/:name' component={Detail}></Route>
        <Route component={() => <h3>页面不存在</h3>}></Route> 
    </Switch> 
    
</BrowserRouter> 
        )
    }
}

export default RouterTest


