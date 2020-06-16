import React, { PureComponent, Component } from 'react'
import JsxText from './components/jsxText'
import Statemgt from './components/statemgt'
import EventHander from './components/eventHander'
import Lifecycle from './components/lifecricle'
import Composition from './components/composition'
import Context from './components/context'
import Hoctest from './components/Hoctest'
import HooksTest from './components/Hookstest'
// import WrappedNormalLoginForm from './components/Formtest'

import {Button} from 'antd' 
import {Dialog,Dialog2} from './components/Dialog'
import  Tree  from './components/Tree'
import CommentList from './components/CommentList'
import ReduxTest from './components/ReduxTest'
import MyreduxTest from './components/MyreduxTest'
import RouterTest from './components/RouterTest'
import MyRouterTest from './components/MyRouterTest'

// import KFormtest from './components/Kformtest'
 

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
            {/* <p>{props.title}</p> */}
            {/* <JsxText/> */}
            {/* <Statemgt /> */}
            {/* <EventHander/> */}
            {/* <Context></Context> */}
            {/* <Hoctest/> */}
            {/*  <Button type="primary">Button</Button>  */}
            {/* <Composition/> */}
            {/* <HooksTest/> */}
            {/* <WrappedNormalLoginForm /> */}
            {/* <KFormtest/> */}
            {/* <Dialog>
                safas
            </Dialog> */}
            {/* <Dialog2>

                ASGASGAG
            </Dialog2> */}
            {/* <Tree>
                 
            </Tree> */}

            {/* <CommentList /> */}
            {/* <ReduxTest /> */}
            {/* <MyreduxTest/> */}
            {/* <RouterTest></RouterTest> */}
            <MyRouterTest></MyRouterTest>
        </div>
    )
}

export default App




