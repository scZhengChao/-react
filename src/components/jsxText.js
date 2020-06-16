import React, { PureComponent,Component } from 'react'
import logo from '../logo.svg'
import index from './index.css'
import style from './index.module.css'

// 变量使用    只要是合法的js表达式
const name = 'laowang'
const user = {firstname:'lao',lastname:'wang'};
function formatname(user){
    return user.firstname + ' ' +  user.lastname
}
const greet = <p>hello laowang</p>

// 由于条件语句和循环语句 不是合法的表达式
// const title  = name ? <h1>{name}</h1> : null


//数组 作为一组 子元素处理
const arr = [1,2,3].map(item=><li key={item}>{item}</li>)

export default class jsxText extends PureComponent {
    render() {
        return (
            <div>
                 <div>
                    {/* {title} */}
                    {name ? <h1>{name}</h1> : null}
                    <p>{formatname(user)}</p>
                    {greet}
                    <ul>
                        {arr}
                    </ul>
                    <img src={logo} alt="logo" style={{width:100}}  className={style.img2}/>
                </div>
            </div>
        )
    }
}
