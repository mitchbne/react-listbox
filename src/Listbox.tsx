import React, { Component } from "react"

export const ListboxContext = React.createContext({})

interface SharedProps {
  children: React.ReactNode;
  className?: string;
}

interface SingleselectProps extends SharedProps {
  multiselect?: false;
  value: string | null;
  onChange: (value: string | null) => void;
}

interface MultiselectProps extends SharedProps {
  multiselect: true;
  values: string[];
  onChange: (value: string[]) => void;
}

type Props = SingleselectProps | MultiselectProps

type State = {
  typeahead: string,
  listboxButtonRef: HTMLElement | null,
  listboxListRef: HTMLElement | null,
  isOpen: boolean,
  activeItem: string | null,
  values: Array<string | null>,
  labelId: string | null,
  buttonId: string | null,
  optionIds: Array<[string, string]>,
  optionRefs: Array<[string, HTMLElement]>,
  lastSelected: string | null;
}

export class Listbox extends Component<Props, State> {
  static defaultProps = { values: [] }
  
  constructor(props: Props){
    super(props)
    this.state = {
      typeahead: "",
      listboxButtonRef: null,
      listboxListRef: null,
      isOpen: false,
      activeItem: null,
      values: [],
      labelId: null,
      buttonId: null,
      optionIds: [],
      optionRefs: [],
      lastSelected: null,
    }
  }

  getActiveDescendant = (): string | null => {
    const [, id] = this.state.optionIds.find(([value]) => value === this.state.activeItem) || [null, null]
    return id
  }

  registerOptionId = (value: string, optionId: string): void => {
    this.unregisterOptionId(value)
    this.setState(prevState => ({ optionIds: [...prevState.optionIds, [value, optionId]] } ))
  }

  unregisterOptionId = (value: string): void => {
    this.setState(prevState => ({ optionIds: prevState.optionIds.filter(([candidateValue]) => candidateValue !== value) }) )
  }

  type = (value: string): void => {
    this.setState(prevState => ({ typeahead: prevState.typeahead.concat(value) }), () => {
      const [match] = this.state.optionRefs.find(
        ([, ref]) => {
          const el: HTMLElement = ref
          return el.innerText.toLowerCase().startsWith(this.state.typeahead.toLowerCase())
        }
      ) || [null]

      if (match !== null) { this.focus(match) }

      this.clearTypeahead()
    })
  }

  clearTypeahead = (): void => {
    setTimeout(() => {this.setState({ typeahead: "" }) }, 500)
  }

  registerOptionRef = (value: string, optionRef: HTMLElement): void => {
    this.unregisterOptionRef(value)
    this.setState(prevState => ({ optionRefs: [...prevState.optionRefs, [value, optionRef]] }))
  }

  unregisterOptionRef = (value: string): void => {
    this.setState(prevState => ({ optionRefs:  prevState.optionRefs.filter(([candidateValue]) => candidateValue !== value) }))
  }

  toggle = (): void => { this.state.isOpen ? this.close() : this.open() }

  open = (): void => {
    this.setState({ isOpen: true }, () => {
      window.setTimeout(() => {
        if (this.state.listboxListRef){
          this.focus(this.getDefaultFocusValue())
          window.setTimeout(() => {
            this.state.listboxListRef?.focus()
          }, 0)
        }
      }, 0)
    })
  }

  getDefaultFocusValue = (): string | null => {
    // Set active value to be the first option
    // in the list if no item is selected.
    // https://www.w3.org/TR/wai-aria-practices/#listbox_kbd_interaction
    const firstSelectedOption = this.props.multiselect ? this.props.values[0] : this.props.value
    return firstSelectedOption || this.state.values[0]
  }

  close = (): void => {
    this.setState({ isOpen: false }, () => { this.state.listboxButtonRef?.focus() })
  }

  select = (value: string): void => {
    if (this.props.multiselect) {
      this.props.onChange(this.sortByValues(this.toggleValue(value)))
    } else {
      this.props.onChange(value)
      process.nextTick(() => {
        this.close()
      })
    }

    this.setState({ lastSelected: value })
  }

  selectMany = (values: string[]): void => {
    if (this.props.multiselect) {
      const newValues = [...values, ...this.props.values]
      const dedupedNewValues = newValues.filter((value, index) => index === newValues.indexOf(value) )
      this.props.onChange(this.sortByValues(dedupedNewValues))
    }
  }
  
  sortByValues(values: string[]): string[] {
    const indexOf = (value: string) => this.state.values.indexOf(value)
    return values.sort((a, b) => {
      if (indexOf(a) > indexOf(b)) {
        return 1
      } else if (indexOf(a) < indexOf(b)) {
        return -1
      }
      
      return 0
    })
  }

  toggleValue(value: string): string[] {
    if (this.props.multiselect) {
      const values = this.props.values
      return values.includes(value) ? values.filter(v => v !== value) : [value, ...values]
    }

    return []
  }

  focus = (value: string | null): void => {
    this.setState({ activeItem: value }, () => {
      if (value === null){ return }
      this.state.listboxListRef?.children[this.state.values.indexOf(value)].scrollIntoView({ block: "nearest" })
    })
  }

  setListboxButtonRef = (ref: HTMLElement): void => { this.setState({ listboxButtonRef: ref })}
  setListboxListRef = (ref: HTMLElement): void => { this.setState({ listboxListRef: ref })}
  setButtonId = (id: string): void => { this.setState({ buttonId: id })}
  setLabelId = (id: string): void => { this.setState({ labelId: id })}
  setValues = (values: string[]): void => { this.setState({ values })}
  setActiveItem = (activeItem: string): void => { this.setState({ activeItem })}

  render(): React.ReactNode {
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
      selectMany: this.selectMany,
      focus: this.focus,
      clearTypeahead: this.clearTypeahead,
      typeahead: this.state.typeahead,
      type: this.type,
      setListboxListRef: this.setListboxListRef,
      setListboxButtonRef: this.setListboxButtonRef,
      listboxButtonRef: this.state.listboxButtonRef,
      listboxListRef: this.state.listboxListRef,
      lastSelected: this.state.lastSelected,
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
          { children instanceof Function ? children({ isOpen }) : children }
        </div>
      </ListboxContext.Provider>
    )
  }
}

export default null
