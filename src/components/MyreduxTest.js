import React, { Component } from 'react'
import PropTypes from 'prop-types' 
import { createStore,applyMiddleware } from '../store/Kreducer'
import { act } from 'react-dom/test-utils';

const counterReducer = function(state = 0, action) {
    const num = action.payload || 1;
    switch (action.type) {
      case "add":
        return state + num;
      case "minus":
        return state - num;
      default:
        return state;
    }
  };

// 自定义中间件
function logger ({getstate}){

    // 返回中间件的真正的执行函数   接受action的这个函数就是 参入下一个中间件的dispatch 函数 
    return dispatch => action =>{
        //执行中间件任务
        console.log(action.type + '执行了！！')

        //执行下一个中间件  最终执行的函数；如果是最后一个，就是 原dispatch 函数， 其他的情况下为传入的 dispatch函数
        return dispatch(action) 
    }
}

//thunk 实现   
const thunk = ({dispatch,getState}) => dispatch => action => {    
    //处理action
    if (typeof action == 'function') {        
        return action(dispatch, getState)    
    }    
    //不是函数直接跳过
    return dispatch(action) 
} 



// 从外到里执行；从右到左执行
const store = createStore(counterReducer,applyMiddleware(thunk,logger))
export default class MyreduxTest extends Component {
    static contextTypes = {            
        store: PropTypes.object        
    }  
    constructor(props,context){
        super(props,context)
        console.log(context)
    }
    componentDidMount(){
        store.subscribe(()=>this.forceUpdate())
    }

    render() {
        return (
            <div>
                {store.getState()}
                <button onClick={()=>store.dispatch({type:'add'}) }>+</button>
                <button onClick={()=>store.dispatch(function(){
                    setTimeout(()=>{
                        store.dispatch({type:'add'})
                    },1000)
                }) }>+</button>
            </div>
        )
    }
}
