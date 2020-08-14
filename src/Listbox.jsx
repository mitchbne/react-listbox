import React, { Component } from "react"

export const ListboxContext = React.createContext()

export class Listbox extends Component {
  constructor(props){
    super(props)
    this.state = {
      typeahead: "",
      listboxButtonRef: null,
      listboxListRef: null,
      isOpen: false,
      activeItem: this.props.value,
      values: null,
      labelId: null,
      buttonId: null,
      optionIds: [],
      optionRefs: [],
    }
  }

  getActiveDescendant = () => {
    const [, id] = this.state.optionIds.find(([value]) => value === this.state.activeItem) || [null, null]
    return id
  }

  registerOptionId = (value, optionId) => {
    this.unregisterOptionId(value)
    this.setState(prevState => ({ optionIds: [...prevState.optionIds, [value, optionId]] } ))
  }

  unregisterOptionId = (value) => {
    this.setState(prevState => ({ optionIds: prevState.optionIds.filter(([candidateValue]) => candidateValue !== value) }) )
  }

  type = (value) => {
    this.setState(prevState => ({ typeahead: prevState.typeahead.concat(value) }), () => {
      const [match] = this.state.optionRefs.find(([, ref]) => ref.innerText.toLowerCase().startsWith(this.state.typeahead.toLowerCase())) || [null]
  
      if (match !== null) { this.focus(match) }
  
      this.clearTypeahead()
    })
  }

  clearTypeahead = () => { 
    setTimeout(() => {this.setState({ typeahead: "" }) }, 500)
  }

  registerOptionRef = (value, optionRef) => {
    this.unregisterOptionRef(value)
    this.setState(prevState => ({ optionRefs: [...prevState.optionRefs, [value, optionRef]] }))
  }

  unregisterOptionRef = (value) => {
    this.setState(prevState => ({ optionRefs:  prevState.optionRefs.filter(([candidateValue]) => candidateValue !== value) }))
  }

  toggle = () => { this.state.isOpen ? this.close() : this.open() }

  open = () => {
    this.setState({ isOpen: true }, () => {
      setTimeout(() => {
        if (this.state.listboxListRef){
          this.focus(this.props.value)
          setTimeout(() => {this.state.listboxListRef.focus()}, 5)
        }
      }, 10)
    })
  }
  
  close = () => {
    this.setState({ isOpen: false }, () => { this.state.listboxButtonRef.focus() })
  }
  
  select = (value) => {
    this.props.onChange(value)
    setTimeout(() => {this.close() }, 5)
  }
  
  focus = (value) => {
    this.setState({ activeItem: value }, () => {
      if (value === null){ return }
      this.state.listboxListRef.children[this.state.values.indexOf(this.state.activeItem)].scrollIntoView({ block: "nearest" })
    })
  }

  setListboxButtonRef = (ref) => { this.setState({ listboxButtonRef: ref })}
  setListboxListRef = (ref) => { this.setState({ listboxListRef: ref })}
  setButtonId = (id) => { this.setState({ buttonId: id })}
  setLabelId = (id) => { this.setState({ labelId: id })}
  setValues = (values) => { this.setState({ values })}
  setActiveItem = (activeItem) => { this.setState({ activeItem })}

  render(){
    const { children, className } = this.props
    const { isOpen } = this.state

    const ProvidedContext = {
      getActiveDescendant: this.getActiveDescendant,
      registerOptionId: this.registerOptionId,
      unregisterOptionId: this.unregisterOptionId,
      registerOptionRef: this.registerOptionRef,
      unregisterOptionRef: this.unregisterOptionRef,
      toggle: this.toggle,
      open: this.open,
      close: this.close,
      select: this.select,
      focus: this.focus,
      clearTypeahead: this.clearTypeahead,
      typeahead: this.state.typeahead,
      type: this.type,
      setListboxListRef: this.setListboxListRef,
      setListboxButtonRef: this.setListboxButtonRef,
      listboxButtonRef: this.state.listboxButtonRef,
      listboxListRef: this.state.listboxListRef,
      isOpen: this.state.isOpen,
      activeItem: this.state.activeItem,
      setActiveItem: this.setActiveItem,
      values: this.state.values,
      setValues: this.setValues,
      labelId: this.state.labelId,
      setLabelId: this.setLabelId,
      buttonId: this.state.buttonId,
      setButtonId: this.setButtonId,
      props: this.props,
    }

    return (
      <ListboxContext.Provider value={ProvidedContext}>
        <div className={className}>
          { typeof children === "function" ? children({ isOpen }) : children }
        </div>
      </ListboxContext.Provider>
    )
  }
}

export default null
