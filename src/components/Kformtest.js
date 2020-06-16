import React,{Component} from 'react'



//高阶组件
function kformcreate(Comp){

    return class extends Component {
        constructor(props){
            super(props)
            this.options = {}
            this.state = {

            }
        }
        //全局校验
        validateFields=(cb)=>{
            const rets = Object.keys(this.options).map(field=>{
                return this.validateField(field)
            })

            const ret = rets.every(v=>v)
            cb(ret,this.state )


        }
        //单项校验
        validateField=(field)=>{
           //获取校验项的值和规则
          const {rules} = this.options[field]

          let ret = !rules.some(rule=>{
              if(rule.required){
                if(!this.state[field]){
                    //设置错误信息
                    this.setState({
                        [field + 'Message']:rule.message
                    })
                    return true
                }
              }
              return false  
          })

          // 清理错误清晰
          if(ret){
              this.setState({
                  [field + 'Message']:''
              })
          }

          return ret

        }

        handleChange=(e)=>{
          const {name,value} = e.target
          this.setState({
              [name]:value
          },()=>{
              this.validateField(name)
          })  
        }
        getFieldDec=(field,options)=>{

            this.options[field] = options
            // 返回一个装饰器
            return (inputComp)=>{
                //  返回真正的组价
                return (
                    <div>
                        {
                            React.cloneElement(inputComp,{
                                name:field,
                                value:this.state[field] || '',
                                onChange:this.handleChange
                            })
                        }
                        {
                                this.state[field + 'Message'] && <p style='color:red'>{this.state[field + 'Message']}</p>
                        }
                    </div>
                )
            }
        }

      
        render(){
          
            return <Comp  
                    getFieldDec={this.getFieldDec}   
                    validateFields ={this.validateFields}
                    {...this.props}
                    />
        }

    }

}



@kformcreate
class kFormtest  extends Component{
   
    onLogin=()=>{
        this.props.validateFields((isValid,data)=>{
            if(isValid){

            }
        })
    }
    render(){
        const {getFieldDec} = this.props
        return (
            <div>
                {getFieldDec('username',{
                    rules:[{required:true,message:'请输入用户名'}]
                })(<input type="text" />)}
                
                {getFieldDec('password',{
                    rules:[{required:true,message:'请输入密码'}]
                })(<input type="password" />)}
                <button onClick={this.onLogin}>登陆</button>
            </div>
        )
    }
}

export default kFormtest