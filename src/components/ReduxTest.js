import React, { Component } from 'react'
import store from '../store'


//想当与一个装饰器 工厂函数 
//传入一堆配置； 返回一个装饰器
import { connect } from 'react-redux'; 

import { add , minus , asyncAdd} from '../store/counter'

// 我把状态给你；你把它放在props 属性上；仅此而已；类似mapGetters ，mapStates ， mapActions ; 把独立组件的数据放在组件上
/**
 * 参数一：mapStateToProps = (state)=>return 对象（把映射到this.props上）
 * 参数二：mapDispatchToProps = (dispathch)=>return {add:()=>dispatch((type:'add'))}
 * 自动刷新
 * 自动渲染
 * 映射到组件属性
 */
@connect(
    state=>({num:state.counterReduer}),
    // {  // action creater  一个函数；返回一个action 对象 ; 最终都会被合并到props后  ;保持一个功能单一和纯粹；不传第二个函数 默认会把dispatch 搞到this.props上
    //     add:(num)=>({type:'add',payload:num}),  
    //     minus:()=>({type:'minus'}),
    //     //返回的是一个对象而不是函数
    //     asyncAdd:()=>dispatch=>{
    //         // 异步调用
    //         setTimeout(()=>{
    //             dispatch({type:'add'})
    //         },1000)
    //     }
    // }

        {
            add,minus,asyncAdd
        }
    // dispatch =>({  // action creater  一个函数；返回一个action 对象 ; 最终都会被合并到props后  ;保持一个功能单一和纯粹；不传第二个函数 默认会把dispatch 搞到this.props上
    //     add:()=>dispatch({type:'add'}),  
    //     minus:()=>dispatch({type:'minus'})
    // })
)
class ReduxTest extends Component {
    // componentDidMount(){
    //     // 订阅状态的变更   
    //     store.subscribe(()=>{
    //         // 强制跟新
    //         this.forceUpdate() 
    //     })
    // }

    render() {
        return (
            <div>
                {/* vuex 之所以会变化应为他利用vue本身的响应式原理。本身已经被defineproperty 了 */}
                {/* 然而 react 并没有重新渲染 */}
                {/* {store.getState()} */}
                {this.props.num}
                <div>
                    {/* 派发一个action； action 就是一个普通的对象 */}
                    {/* <button onClick={()=>store.dispatch({type:'add'}) }>+</button>
                    <button onClick={()=>store.dispatch({type:'minus'}) }>-</button> */}
                    <button onClick={()=>this.props.add(2) }>+</button>
                    <button onClick={this.props.minus }>-</button>
                    <button onClick={this.props.asyncAdd }>+</button>
                </div>
            </div>
        )
    }
}

export default ReduxTest