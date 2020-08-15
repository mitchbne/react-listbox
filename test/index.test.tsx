import * as React from "react"
import * as ReactDOM from "react-dom"
import { Listbox, ListboxButton, ListboxLabel, ListboxList, ListboxOption } from "../src"

describe("all components render", () => {
  it("renders without crashing", () => {
    const div = document.createElement("div")
    ReactDOM.render(
      <Listbox onChange={() => null} value="selectedVal">
        <ListboxLabel>Select something</ListboxLabel>
        <ListboxButton>Click me</ListboxButton>
        <ListboxList>
          <ListboxOption value="item1">Item 1</ListboxOption>
          <ListboxOption value="item2">Item 2</ListboxOption>
          <ListboxOption value="item3">Item 3</ListboxOption>
        </ListboxList>
      </Listbox>, div)
    ReactDOM.unmountComponentAtNode(div)
  })
})
