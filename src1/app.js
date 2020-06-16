import React, { PureComponent, Component } from 'react'
import JsxText from './components/jsxText'
import Statemgt from './components/statemgt'
import EventHander from './components/eventHander'
import Lifecycle from './components/lifecricle'
import Composition from './components/composition'
import Context from './components/context'
import Hoctest from './components/Hoctest.tsx'
import HooksTest from './components/Hookstest'


import {Button} from 'antd' 
 

// export default class App extends Component{
//     state = {
//         prop:'old state'
//     }
//     componentDidMount(){
//         console.log('father mounted')
//         this.setState({prop:'new content'})
//         setTimeout(() => {
//             this.setState({prop:'new content'})
//         }, 2000);
//     }
//     render(){
//         return(
//             <div>

//                 <p>{this.props.title}</p>
//                 {/* <jsxText/> */}
//              {this.state.prop &&    <Lifecycle  prop={this.state.prop} />}
//             </div>
//         )
//     }
// }


// 函数式组件  类似类组件的render函数
function App(props){
    return (
        <div>
            <p>{props.title}</p>
            {/* <JsxText/> */}
            {/* <Statemgt /> */}
            {/* <EventHander/> */}
            {/* <Context></Context> */}
            {/* <Hoctest/> */}
             <Button type="primary">Button</Button> 
            {/* <Composition/> */}
            <HooksTest/>
        </div>
    )
}

export default App




