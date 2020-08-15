import * as React from "react"
import * as ReactDOM from "react-dom"
import { Listbox, ListboxButton, ListboxLabel, ListboxList, ListboxOption } from "../src"

describe("all components render", () => {
  it("renders Listbox without crashing", () => {
    const div = document.createElement("div")
    ReactDOM.render(
      <Listbox onChange={() => null} value="selectedVal">
        <ListboxButton>Click me</ListboxButton>
      </Listbox>, div)
    ReactDOM.unmountComponentAtNode(div)
  })

  it("renders ListboxButton without crashing", () => {
    const div = document.createElement("div")
    ReactDOM.render(<ListboxButton>Click me</ListboxButton>, div)
    ReactDOM.unmountComponentAtNode(div)
  })

  it("renders ListboxLabel without crashing", () => {
    const div = document.createElement("div")
    ReactDOM.render(<ListboxLabel>Label</ListboxLabel>, div)
    ReactDOM.unmountComponentAtNode(div)
  })

  it("renders ListboxList without crashing", () => {
    const div = document.createElement("div")
    ReactDOM.render(<ListboxList>
      <ListboxOption value="testVal">testVal</ListboxOption>
      <ListboxOption value="testVal2">testVal2</ListboxOption>
    </ListboxList>, div)
    ReactDOM.unmountComponentAtNode(div)
  })

  it("renders ListboxOption without crashing", () => {
    const div = document.createElement("div")
    ReactDOM.render(<ListboxOption value="anotherTestVal">anotherTestVal</ListboxOption>, div)
    ReactDOM.unmountComponentAtNode(div)
  })
})
