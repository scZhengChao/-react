import React, { Component } from 'react'

//创建上下文
const Context = React.createContext()


//获取Provider 和 comsumer  一切皆组件的思想
const Provider = Context.Provider
const Consumer = Context.Consumer



const  withConsumer = Consumer => Comp=> props=>{
    return <Consumer >{value=><Comp {...value}></Comp>}</Consumer>
}

const Child = withConsumer(Consumer)((props)=>(<div onClick={e=>props.add(e)}>{props.counter}</div>))


export default class context extends Component {
    state={
        counter:0
    }
    add=()=>{
        this.setState(  {counter:this.state.counter +1})
    }

    render() {
        return (
            <Provider value={{counter:this.state.counter,add:this.add }}>
                <Child/>
                <Child />
                <Child />
                {/* <Consumer>{value=><Child {...value}></Child>}</Consumer> */}
            </Provider>
        )
    }
}
