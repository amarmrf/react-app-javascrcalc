import React from 'react';
import './App.css';
import {evaluate} from "mathjs";
import {Button, Input} from "./components/Button"

class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      input: "0",
      equal: false,
      decimal:false
    }
  }
  
  isOperator = val => {
  return !isNaN(val) || val === "=" || val === ".";
  }

  handleEqual = () => {
    this.setState(state=>({equal:true, input:
      state.input==="0"?"0":
      evaluate(state.input).toString()
      }))
  }

  handleClear = () => {
    this.setState({input:"0",equal:false,decimal:false})
  }

  handleZero = (val) => {
    if (this.state.input==="0"||(!this.isOperator(this.state.input[this.state.input.length-2])&&this.state.input[this.state.input.length-1]==="0")) return
    this.setState(state=>({equal:false,
    input:(state.equal===true && !isNaN(val))?val.toString():state.input.toString()+val,
    }))
  }

  handleClick = (val) => {
    this.setState(state=>({
      decimal:!this.isOperator(val)?false:state.decimal,
      equal:false,
      input:(state.equal===true && !isNaN(val)) ?val.toString():state.input==="0"?val:(!this.isOperator(this.state.input[this.state.input.length-2])&&this.state.input[this.state.input.length-1]==="0")?(state.input.slice(0,-1).toString()+val):
        state.input.toString()+val
        }))
  }
  //just take the LAST input NUMBER and check it, if it is decimal then return
  //regex is /\d+$/ match this to get the LAST input number
  handleDecimal = (val) => {
    if(this.state.decimal===true) return
    this.setState(state=>({
      decimal:true,
      equal:false,
      input:state.equal===true?val.toString():state.input[state.input.length-1]===val?state.input.toString():state.input.toString()+val
    }))
  }

  render() {
    return (
    <div className="App">
     <div className="calc-wrapper">
     <Input id="display" input={this.state.input}></Input>
     <div className="row">
        <Button id="one"  handleClick={this.handleClick}>1</Button>
        <Button id="two" children={2} handleClick={this.handleClick}/>
        <Button id="three" children={3} handleClick={this.handleClick}/>
        <Button id="add" children={"+"} handleClick={this.handleClick}/>
      </div>

     <div className="row">
        <Button id="four" children={4} handleClick={this.handleClick}/>
        <Button id="five" children={5} handleClick={this.handleClick}/>
        <Button id="six" children={6} handleClick={this.handleClick}/>
        <Button id="multiply" children={"*"} handleClick={this.handleClick}/>
      </div>

      <div className="row">
        <Button id="seven" children={7} handleClick={this.handleClick}/>
        <Button id="eight" children={8} handleClick={this.handleClick}/>
        <Button id="nine" children={9} handleClick={this.handleClick}/>
        <Button id="divide" children={"/"} handleClick={this.handleClick}/>
      </div>

       <div className="row">
        <Button id="equals" children={"="} handleClick={this.handleEqual}/>
        <Button id="zero" children={0} handleClick={this.handleZero}/>
        <Button id="decimal" children={"."} handleClick={this.handleDecimal}/>
        <Button id="subtract" children={"-"} handleClick={this.handleClick}/>
      </div>

      <div className="row">
      <div id="clear"className="clear-btn" onClick={this.handleClear}>AC</div>
      </div>
     </div>
    </div>
  )}
}

export default App;
