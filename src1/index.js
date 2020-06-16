import React from 'react'
import ReactDOM from 'react-dom'
import App from './app'

// react类 负责逻辑控制，比如修改数据 --》 vdom
//Reactdom 类负责逻辑渲染， vdom--》dom
//babel-loader 可以转换jsx --》vdom, 通过React.createElement()
// const jsx = <h1>react-dom</h1>
// console.log(jsx)
// ReactDOM.render(jsx,document.getElementById('root'))






ReactDOM.render(<App title='laowang'/>,document.getElementById('root'))





 