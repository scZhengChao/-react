import React, { PureComponent } from 'react'


export default class eventHander extends PureComponent {
  
    
    constructor(props){
        super(props)
        this.state={
            name:''
        }
    }
    handleChange(e){
        this.setState({
            name:e.target.value
        })
    }

    render() {
        return (
            <div>
                <input type="text" value={this.state.name}  onChange={e=>this.handleChange(e)}/>
                <p>{this.state.name}</p>
            </div>
        )
    }
}
