import React, { Component } from "react"
import { ListboxContext } from "./Listbox"

function isString(value) {
  return typeof value === "string" || value instanceof String
}

export class ListboxList extends Component {
  constructor(props){
    super(props)
    this.state = { focusedIndex: null, values: null }
  }

  componentDidMount(){
    this.context.setListboxListRef(this.ownRef)
    const values = this.props.children.map(node => node.props.value)
    this.setState({ values }, () => { this.context.setValues(values) })
  }

  handleBlur = (e) => {
    if (e.relatedTarget === this.context.listboxButtonRef){ return } // The button will already handle the toggle for us
    this.context.close()
  }

  handleKeydown = (e) => {
    const focusedIndex = this.state.values.indexOf(this.context.activeItem )

    let indexToFocus
    switch (e.key) {
    case "Esc":
    case "Escape":
      e.preventDefault()
      this.context.close()
      break
    case "Tab":
      e.preventDefault()
      break
    case "Up":
    case "ArrowUp":
      e.preventDefault()
      indexToFocus = focusedIndex - 1 < 0 ? this.state.values.length - 1 : focusedIndex - 1
      this.context.focus(this.state.values[indexToFocus])
      break
    case "Down":
    case "ArrowDown":
      e.preventDefault()
      indexToFocus = focusedIndex + 1 > this.state.values.length - 1 ? 0 : focusedIndex + 1
      this.context.focus(this.state.values[indexToFocus])
      break
    case "Spacebar":
    case " ":
      e.preventDefault()
      if (this.context.typeahead !== "") {
        this.context.type(" ")
      } else {
        this.context.select(this.context.activeItem || this.context.props)
      }
      break
    case "Enter":
      e.preventDefault()
      this.context.select(this.context.activeItem || this.context.props)
      break
    default:
      if (!(isString(e.key) && e.key.length === 1)) {
        return
      }

      e.preventDefault()
      this.context.type(e.key)
      return
    }
  }

  handleMouseLeave = () => {
    this.context.setActiveItem(null)
  }

  render(){
    const { children, className } = this.props
    return (
      <ul
        aria-activedescendant={this.context.getActiveDescendant()}
        aria-labelledby={this.context.props.labelledby}
        className={className}
        onBlur={this.handleBlur}
        onKeyDown={this.handleKeydown}
        onMouseLeave={this.handleMouseLeave}
        ref={el => this.ownRef = el}
        role="listbox"
        tabIndex={-1}
      >
        {children}
      </ul>
    )
  }
} 

ListboxList.contextType = ListboxContext

export default null