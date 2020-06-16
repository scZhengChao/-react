import React, { PureComponent } from 'react'


// Lesson保证功能单一，它不关心数据来源，只负责显示 
function Lesson(props) {  
    return (    
    <div>      {props.stage} - {props.title}    </div>  
    ); 
}
 
// 高阶组件withContent负责包装传入组件Comp 
// 包装后组件能够根据传入索引获取课程数据，真实案例中可以通过api查询得到 

// 模拟数据 
const lessons = [  
    { stage: "React", title: "核心API" },  
    { stage: "React", title: "组件化1" },  
    { stage: "React", title: "组件化2" } 
];
 
const withContent = Comp =>props=>{
    const content = lessons[props.idx]
    return <Comp {...content}></Comp>
}

// withLog高阶组件，能够在组件挂载时输出日志
const withLog = Comp =>{
    return class extends React.Component {
        componentDidMount(){
            console.log('didmount',this.props)
        }
        render(){
            return <Comp {...this.props}/>
        }
    }
}



//包装
// const LessonWithcontent = withLog(withContent(Lesson))




// 装饰器语法 @withLog
// 先后顺序：从下往上
@withLog
@withContent
class Lesson2 extends React.Component{  
    render(){
        return ( <div> {this.props.stage} - {this.props.title}</div>  )
    }
    
}





export default class Hoctest extends PureComponent {
    render() {
        return (
            <div>
                {
                    [0,1,2].map((item,idx)=>
                        //  <LessonWithcontent key={idx} idx={idx}/>
                        <Lesson2 key={idx} idx={idx}/>
                    )
                }
            </div>
        )
    }
}
