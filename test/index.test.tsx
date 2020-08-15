import * as React from "react"
import * as ReactDOM from "react-dom"
import { Listbox, ListboxButton, ListboxLabel, ListboxList, ListboxOption } from "../src"

describe("it", () => {
  it("renders Listbox without crashing", () => {
    const div = document.createElement("div")
    ReactDOM.render(<Listbox />, div)
    ReactDOM.unmountComponentAtNode(div)
  })
})

describe("it", () => {
  it("renders ListboxButton without crashing", () => {
    const div = document.createElement("div")
    ReactDOM.render(<ListboxButton />, div)
    ReactDOM.unmountComponentAtNode(div)
  })
})

describe("it", () => {
  it("renders ListboxLabel without crashing", () => {
    const div = document.createElement("div")
    ReactDOM.render(<ListboxLabel />, div)
    ReactDOM.unmountComponentAtNode(div)
  })
})

describe("it", () => {
  it("renders ListboxList without crashing", () => {
    const div = document.createElement("div")
    ReactDOM.render(<ListboxList />, div)
    ReactDOM.unmountComponentAtNode(div)
  })
})

describe("it", () => {
  it("renders ListboxOption without crashing", () => {
    const div = document.createElement("div")
    ReactDOM.render(<ListboxOption />, div)
    ReactDOM.unmountComponentAtNode(div)
  })
})
