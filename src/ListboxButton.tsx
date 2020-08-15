import React, { Component } from "react"
import { ListboxContext } from "./Listbox"
import { generateId } from "./utils"

type Props = {
  children: (({ isFocused }: { isFocused: boolean }) => React.ReactNode | string ) | string | React.ReactNode | null,
  className?: string,
}

type State = {
  isFocused: boolean,
  id: string
}

export class ListboxButton extends Component<Props, State> {
  constructor(props: Props){
    super(props)
    this.state = {
      id: generateId(),
      isFocused: false,
    }
  }
  
  
  componentDidMount(): void{
    this.context.setButtonId(this.state.id)
    this.context.setListboxButtonRef(this.ownRef)
  }
  ownRef: HTMLElement | null = null
  
  focus = (): void => this.setState({ isFocused: true })
  blur = (): void => this.setState({ isFocused: false })

  render(): React.ReactNode {
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
        { children instanceof Function ? children({ isFocused }) : children }
      </button>
    )
  }
}

ListboxButton.contextType = ListboxContext
export default null