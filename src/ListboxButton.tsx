import React, { Component } from "react"
import { ListboxContext } from "./Listbox"
import { generateId } from "./utils"

export class ListboxButton extends Component {
  constructor(props){
    super(props)
    this.state = {
      id: generateId(),
      isFocused: false,
    }
  }
  
  componentDidMount(){
    this.context.setButtonId(this.state.id)
    this.context.setListboxButtonRef(this.ownRef)
  }
  
  focus = () => this.setState({ isFocused: true })
  blur = () => this.setState({ isFocused: false })

  render(){
    const { children, className } = this.props
    const { isFocused } = this.state
    return (
      <button
        aria-haspopup="listbox"
        aria-labelledby={`${this.context.labelId} ${this.state.id}`}
        className={className}
        id={this.state.id}
        onBlur={this.blur}
        onClick={this.context.toggle}
        onFocus={this.focus}
        ref={el => this.ownRef = el}
        type="button"
        {...(this.context.isOpen ? { "aria-expanded": "true" } : {})}
      > 
        { typeof children === "function" ? children({ isFocused }) : children }
      </button>
    )
  }
}

ListboxButton.contextType = ListboxContext
export default null