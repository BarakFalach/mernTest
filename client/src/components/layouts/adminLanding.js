import React, { Component,useState } from 'react'

export default class adminLanding extends Component {
    constructor(props){
        super(props);
        this.state={admin:""}
    }


    componentDidMount(){
        try {
            const _admin = this.props.location.state;
            console.log(_admin);
            this.setState({admin:_admin.admin});
        }
        catch (err){
            console.log("componentDidMount")
        }   
    }

    render() {     
        
        return (
            <div>
                Welcome {this.state.admin.name}
            </div>
        )
    }
}
