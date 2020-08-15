import React, { Component } from "react"
import { ListboxContext } from "./Listbox"
import { generateId } from "./utils"

type Props = {
  children: React.ReactNode | string,
  className?: string
}

type State = {
  id: string
}

export class ListboxLabel extends Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = { id: generateId() }
  }

  componentDidMount(): void {
    this.context.setLabelId(this.state.id)
  }

  render(): React.ReactNode {
    const { children, className } = this.props
    return ( children && <span className={className} id={this.state.id}>{children}</span> )
  }
} 

ListboxLabel.contextType = ListboxContext
export default null