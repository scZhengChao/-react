

export  function createStore(reducer,enhancer){

    //如果存在enhancer;增强器 改进dispatch
    if(enhancer){
        //高阶函数 增强 createStore 并且返回一个函数 传入 reducer
        return enhancer(createStore)(reducer)
    }

    let currentState = undefined;

    const currentListener = [] ; // 回调函数数组

    function getState(){
        return currentState
    }
    function dispatch(action){
        //修改
        currentState = reducer(currentState,action)
        //变更通知
        currentListener.forEach(cb=>cb())
        return action
    }
    function subscribe(cb){
        currentListener.push(cb)
    }
    //初始化状态
    dispatch({type:'@zhengchao-redux'})

    return {
        getState,dispatch,subscribe

    }
}


// 就是 enhancer  函数 使dispatch 函数不能直接到 action 到reducer ；先经过中间件 最后到 reducer
export  function applyMiddleware (...middleware){

    //接受若干中间件 返回一个强化函数 最为第二个参数 增强dispatch
    //args 就是reducer
    return createStore =>(...args) =>{
        // 完成之前createStore的工作； 很简单 就是创建store
        const store = createStore(...args)

        //强化dispatch 不是直接派发一个action 到 reducer 去执行;先取出dispatch
        let dispatch = store.dispatch

        // 传递给中间件的参数
        const midApi = {
            getState: store.getState,
            dispatch:(...args)=>dispatch(...args)
        }

        //给中间件的传参都穿进去   中间件就是函数
        const chain = middleware.map(mw=>mw(midApi))

        //强化dispatch ，让他可以按顺序执行中间件函数  ；
        //把多个函数变为一个函数;并把第一个函数的返回值作为第二个函数的入参
        //先经过中间件 在   执行最后的action 
        //这里其实返回的的接受action的函数；这个函数在最后 dispatch 的时候执行；返回原来dispath的执行；
        dispatch = compose(...chain)(store.dispatch)   // 函数聚合  把多个函数 转为一个函数

        // 返回全新的store，仅更新强化过的dispatch
        return {
            ...store,
            dispatch
        }
    }
}

export function compose(...funcs){
    if(funcs.length === 0){
        return arg => arg
    }
    if(funcs.length === 1){
        return funcs[0]
    }
    // 聚合函数数组 [fn1,fn2] => f1(fn2())  最后返回一个接受dispatch的高阶函数；执行顺序 f2-->f1
    return funcs.reduce((left,right)=>(...args)=>left(right(...args)))
}