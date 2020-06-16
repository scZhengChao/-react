export const add=(num)=>({type:'add',payload:num}); 
export const minus = ()=>({type:'minus'});
export const asyncAdd = (dispatch,getState)=>dispatch=>{
            // 异步调用
            setTimeout(()=>{
                dispatch({type:'add'})
            },1000)
        }


// vuex 是直接拿值修改；redux 是相同输入必定有相同输出的纯函数，是可预测的；返回一个新的值
// reducer 就相当于 vuex  里的 mutations；但是它认为不应该修改原来的值； 而是返回一个全新的对象；初始化state并定义state的修改规则
export const counterReduer =  function(state=0,action){  
    const num = action.payload || 1 
     switch (action.type) {      
        case 'add':        
            return state + num      
        case 'minus':        
            return state - num      
        default:        
            return state   
    } 
}