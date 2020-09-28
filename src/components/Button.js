import React from "react";
import '../App.css';

export class Input extends React.Component {
  render() {
    return (
      <div className="input" id={this.props.id}>
      {this.props.input}
      </div>
    )
  }
}

export class Button extends React.Component {

  isOperator = val => {
  return !isNaN(val) || val === "=" || val === ".";
  }

  render() {
      return (
      <div className={`button-wrapper ${this.isOperator(this.props.children)?null:"operator"}`} onClick={()=>this.props.handleClick(this.props.children)}>
        <div id={this.props.id} >
          {this.props.children==="*"?"x":this.props.children}
        </div>
      </div>
      )}
}
