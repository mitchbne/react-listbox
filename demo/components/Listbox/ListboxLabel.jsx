import React, { Component } from "react"
import { ListboxContext } from "./Listbox"
import { generateId } from "./utils"

export class ListboxLabel extends Component {
  constructor(props){
    super(props)
    this.state = { id: generateId() }
  }

  componentDidMount(){
    this.context.setLabelId(this.state.id)
  }

  render(){
    const { children, className } = this.props
    return (
      <span className={className} id={this.state.id}>{children}</span>
    )
  }
} 

ListboxLabel.contextType = ListboxContext

export default null