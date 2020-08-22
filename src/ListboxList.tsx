import React, { Component } from "react"
import { ListboxContext } from "./Listbox"

type Props = {
  children: React.ReactElement[],
  className?: string
}

type State = {
  focusedIndex: number | null,
  values: string[] | null
}

function isString(value: any): value is string { // eslint-disable-line @typescript-eslint/no-explicit-any
  return typeof value === "string" || value instanceof String
}

export class ListboxList extends Component<Props, State> {
  constructor(props: Props){
    super(props)
    this.state = { focusedIndex: null, values: null }
  }

  componentDidMount(): void{
    this.context.setListboxListRef(this.ownRef)
    const values: string[] = this.props.children.map(node => node.props.value)
    this.setState({ values }, (): void => { this.context.setValues(values) })
  }
  ownRef: HTMLElement | null = null

  handleBlur = (e: React.FocusEvent): void => {
    if (e.relatedTarget === this.context.listboxButtonRef){ return } // The button will already handle the toggle for us
    this.context.close()
  }

  handleKeydown = (e: React.KeyboardEvent): void => {
    const focusedIndex = this.state.values?.indexOf(this.context.activeItem)
    // focusedIndex is -1 if this.context.activeItem  is not in this.state.values
    if (focusedIndex === -1 || !this.state.values){ return }

    let indexToFocus
    switch (e.key) {
    case "Esc":
    case "Escape":
      e.preventDefault()
      this.context.close()
      break
    case "Tab":
      e.preventDefault()
      this.context.close()
      break
    case "Up":
    case "ArrowUp":
      e.preventDefault()
      if (focusedIndex || focusedIndex === 0){ // Typescript makes us check this.
        indexToFocus = focusedIndex - 1 < 0 ? this.state.values?.length - 1 : focusedIndex - 1
        this.context.focus(this.state.values[indexToFocus])
      }
      break
    case "Down":
    case "ArrowDown":
      e.preventDefault()
      if (focusedIndex || focusedIndex === 0){ // Typescript makes us check this.
        indexToFocus = focusedIndex + 1 > this.state.values?.length - 1 ? 0 : focusedIndex + 1
        this.context.focus(this.state.values[indexToFocus])
      }
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

  handleMouseLeave = (): void => {
    this.context.setActiveItem(null)
  }

  render(): React.ReactNode{
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
