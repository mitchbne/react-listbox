import React, { Component } from "react"
import { ListboxContext } from "./Listbox"
import { generateId } from "./utils"

export class ListboxOption extends Component {
  constructor(props){
    super(props)
    this.state = { id: generateId() }
  }

  componentDidMount(){
    this.context.registerOptionRef(this.props.value, this.ownRef)
    this.context.registerOptionId(this.props.value, this.state.id)
  }
  
  componentWillUnmount(){
    this.context.unregisterOptionId(this.props.value)
    this.context.unregisterOptionRef(this.props.value)
  }

  handleClick = () => {
    this.context.select(this.props.value)
  }

  handleMouseMove = () => {
    if (this.context.activeItem === this.props.value) { return } // this option is already active

    this.context.setActiveItem(this.props.value)
  }

  render(){
    const { children, className } = this.props
    const isActive = this.context.activeItem === this.props.value
    const isSelected = this.context.props.value === this.props.value
    return (
      <li
        className={className}
        id={this.state.id}
        onClick={this.handleClick}
        onMouseMove={this.handleMouseMove}
        ref={el => this.ownRef = el}
        role="option"
        {...isSelected ? { "aria-selected": true } : {}}
      >
        { typeof children === "function" ? children({ isSelected, isActive }) : children }
      </li>
    )
  }
} 

ListboxOption.contextType = ListboxContext
export default null