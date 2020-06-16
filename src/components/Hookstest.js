import React, { useState ,useEffect,useReducer,useContext} from "react";
const Context = React.createContext()


function Fruitlist ({fruites,onsetFruit}){
    return (
        <ul>
            {fruites.map(f=><li key={f} onClick={()=>onsetFruit(f)}>{f}</li>)}
        </ul>
    )
}


// 声明输入组件 
function FruitAdd(props) {  
    // 输入内容状态及设置内容状态的方法  
    const [pname, setPname] = useState("");  

    useEffect(()=>{
        console.log('FruitAdd')
    },[])
    // 使用useContext获取上下文 
    const { dispatch} = useContext(Context)
    console.log(useContext(Context))
    // 键盘事件处理  
    const onAddFruit = e => {    
        if (e.key === "Enter") {      
            // props.onAddFruit(pname);   
            dispatch({type:'add',payload:pname})   
            setPname("");    
        }
    };  
    return (    
        <div>      
            <input        
            type="text"        
            value={pname}        
            onChange={e => setPname(e.target.value)}        
            onKeyDown={onAddFruit}      
            />    
        </div>  
    ); 
} 

// 添加fruit状态维护fruitReducer 
// 理解为vue里的 mutations
function fruitReducer(state, action) {  
    switch (action.type) {    
        case "init":      
        return action.payload;    
    case "add":      
        return [...state, action.payload];    
    default:      
        return state;  
    }
}
 
export default function HooksTest() {  
    // useState(initialState)，接收初始状态，返回一个由状态和其更新函数组成的数组  
    const [fruit, setFruit] = useState("");  
    // const [fruites,setFruits] =useState([])
    //只要setFruie执行都会重新执行该函数

    // useReducer(reducer，initState)  
    //参数一 是reducer 
    //参数二 是 初始值
    const [fruites, dispatch] = useReducer(fruitReducer, []);
 
    // 异步获取我的水果列表
    useEffect(()=>{
        console.log('useEffect')
        setTimeout(() => {        
            // setFruits(['香蕉','西瓜'])   
            dispatch({type:'init',payload:['香蕉','西瓜']}) 
        }, 1000); 
    },[]) // 只要后面的依赖 变 就会执行

    // 异步获取我的水果列表
    // useEffect(()=>{
    //     console.log('useEffect')
    //     setTimeout(() => {        
    //         setFruits(['香蕉','西瓜'])    
    //     }, 1000); 
    //     document.title = fruit; 
    // },[fruit]) // 只要后面的依赖 变 就会执行

    // useEffect(() => {    
    //     const timer = setInterval(() => {        
    //         console.log('msg');            
    //     }, 1000);
 
    //     return function(){        
    //         clearInterval(timer);    
    //     }  
    // }, []);
   
    return (    
        <Context.Provider  value={{fruites,dispatch}} >
            <div>      
                <p>{fruit === "" ? "请选择喜爱的水果：" : `您的选择是：${fruit}`}</p>
                <Fruitlist fruites={fruites} onsetFruit={setFruit}/> 
                {/* <FruitAdd onAddFruit={pname => setFruits([...fruites, pname])} />     */}
                {/* <FruitAdd onAddFruit={pname=>dispatch({type: 'add', payload: pname})} />     */}
                <FruitAdd  />   
            </div> 
        </Context.Provider>
        
    ); 
}



