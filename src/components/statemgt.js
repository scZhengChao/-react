import React, { Component,useState,useEffect} from 'react'



// 函数数组件的状态管理： useState,useEffect
//hooks 只能在16.8.x 以后使用
function ClockFunc(){
    //创建状态， useState返回状态和修改状态函数所组成的的函数数组
    const [date,setDate] = useState(new Date())
    // 定时器是副作用 dom 操作 ajax 调用 需要用法哦useEffec
    useEffect(()=>{  //组件初始化时候执行一次
        const timerId = setInterval(() => {
            setDate(new Date())
        }, 1000);

        return ()=>{ //释放函数  ; 结束时调用
            clearInterval(timerId)
        }
    },[]) // 参数二 指的是依赖状态，本例中没有依赖且执行一次


    return (
        <div>{date.toLocaleString()}</div>
    )
}



class Clock extends Component {
    constructor(props){
        super(props)
        this.state = {
            date :new Date(),
            counter:0
        }
    }
    componentDidMount(){ //挂载完毕
        //直接在 class 组件上   
        this.timerId = setInterval(() => {
            this.setState({
                date: new Date()
            },()=>{
                //通知父组件 变更了
                this.props.change(this.state.date)
            })
        }, 1000);
        // this.setState({counter: this.state.counter + 1},()=>{
        //     console.log(this.state.counter)
        // });   
        // this.setState({counter: this.state.counter + 1},()=>{
        //     console.log(this.state.counter)
        // });   
        // this.setState({counter: this.state.counter + 1},()=>{
        //     console.log(this.state.counter)
        // }); 
        // this.setState((nextState,props)=>({counter:nextState.counter + 1}),()=>{
        //    console.log(this.state.counter)
        // })
        // this.setState((nextState,props)=>({counter:nextState.counter + 1}),()=>{
        //     console.log(this.state.counter)
        // })
        // this.setState((nextState,props)=>({counter:nextState.counter + 1}),()=>{
        //     console.log(this.state.counter)
        // })

        // this.setState((nextState,props)=>{
        //     console.log(this.state.counter)
        //     console.log(nextState.counter)
        //     return {counter:nextState.counter + 1}
        // },()=>{
        //     console.log(this.state.counter)
        //  })
        //  this.setState((nextState,props)=>{
        //     console.log(this.state.counter)
        //     console.log(nextState.counter)
        //     return {counter:nextState.counter + 1}
        // },()=>{
        //     console.log(this.state.counter)
        //  })
        //  this.setState((nextState,props)=>{
        //     console.log(this.state.counter)
        //     console.log(nextState.counter)
        //     return {counter:nextState.counter + 1}
        // },()=>{
        //     console.log(this.state.counter)
        //  }) 

    
        document.body.addEventListener('click', this.changeValue, false) 
        
    }
    changeValue = (e)=>{
        this.setState({counter:this.state.counter + 1})
        console.log(this.state.counter)
    }

    componentWillUnmount(){
        clearInterval(this.timerId)
    }

    render() {
        return (
            <div>
                {this.state.date.toLocaleString()}
            </div>
        )
    }
}


function statemgt(){
    return (
        <div>
            <Clock change={date=>console.log(date.toLocaleString())}/>
            <ClockFunc />
        </div>
    )
}

export default statemgt
