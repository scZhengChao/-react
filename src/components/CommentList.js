    import React, { PureComponent,Component } from 'react'


    // class Comment extends PureComponent {  

    //     //参数是将要变更的属性； 和当前属性做一个对比
    // //     shouldComponentUpdate({ data: { body, author } }) {    
    // //         if (body === this.props.data.body && author === this.props.data.author) {        
    // //             return false;    
    // //         }
    // //         return true; 
    // //     }

    //     render() {  
    //         console.log('go go')  
    //         return (      
    //             <div>        
    //                 <p>{this.props.body}</p>        
    //                 <p> --- {this.props.author}</p>      
    //             </div>    
    //         );  
    //     } 
    // }


    export default class CommentList extends Component {
        constructor(props) {    
            super(props);    
            this.state = {      
                comments: []    
            };  
        }  
        componentDidMount() {    
            setInterval(() => {      //每次 改变的时候 对象的因为地址全变了，而 PureComponent 是 浅比较
                this.setState({        
                    comments: [           
                        { body: "react is very good", author: "facebook" },          
                        { body: "vue is very good", author: "youyuxi" }        
                    ]      
                });    
            }, 1000);  
        }  
        render() {    
            return (      
                <div>        
                    {this.state.comments.map((c, i) => (          
                        // <Comment key={i} data={c} />     
                        <Comment key={i} {...c} />    
                        ))}     
                </div>    
            );  
        } 
    }


const Comment = React.memo(function({ body, author }) {  
    console.log("render");
 
  return (    
        <div>      
            <p>{body}</p>      
            <p> --- {author}</p>    
        </div>  
    ); 
});


