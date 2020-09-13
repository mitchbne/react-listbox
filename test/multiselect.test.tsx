import * as React from "react"
import userEvent from "@testing-library/user-event"
import { render, screen } from "@testing-library/react"
import {
  Listbox,
  ListboxButton,
  ListboxLabel,
  ListboxList,
  ListboxOption,
} from "../src"

describe("given listbox is determined by isOpen", () => {
  beforeEach(() => {
    jest.useFakeTimers()
    Element.prototype.scrollIntoView = jest.fn()
  })
  
  const onChange = jest.fn()
  const optionValues = ["item0", "item1", "item2", "item3"]
  const value = ["item2"]
  
  describe("by default", () => {
    beforeEach(() => setup({ onChange, optionValues, value }))

    it("the listbox should be closed", () => {
      const listbox = screen.queryByRole("listbox")
      expect(listbox).not.toBeInTheDocument()
    })

    it("the button is labeled by the label component", () => {
      const label = screen.getByLabelText("Select something")
      const button = screen.getByRole("button")
      expect(label).toContainElement(button)
    })

    it("the button is not focused", () => {
      const button = screen.getByRole("button")
      expect(button).toHaveTextContent("Click me")
    })
  })
  
  describe("when clicking on the button", () => {
    beforeEach(() => {
      setup({ onChange, optionValues, value })
      userEvent.click(screen.getByText("Click me"))
      // Flush out async focus code
      jest.runAllTimers()
    })

    it("then displays the listbox", () => {
      expect(screen.getByRole("listbox")).toBeInTheDocument()
    })

    it("then focuses the first selected option", () => {
      expect(screen.getByText("Item 2 (selected) (active)")).toBeInTheDocument()
      expect(Element.prototype.scrollIntoView).toHaveBeenCalled()
    })

    describe("when clicking on an option", () => {
      it("then calls onChange with values ordered based on options", () => {
        const item0 = screen.getByText("Item 0")
        userEvent.click(item0)
        
        expect(onChange).toHaveBeenCalledWith(["item0", "item2"])
      })

      it("then does NOT close the list", () => {
        expect(screen.queryByRole("listbox")).toBeInTheDocument()
      })
    })

    describe("when clicking on an already selected option", () => {
      it("then calls onChange with that value removed", () => {
        const item0 = screen.getByText("Item 2 (selected) (active)")
        userEvent.click(item0)
        
        expect(onChange).toHaveBeenCalledWith([])
      })

      it("then does NOT close the list", () => {
        expect(screen.queryByRole("listbox")).toBeInTheDocument()
      })
    })
  })
})

interface Setup {
  onChange: () => void;
  optionValues: string[];
  value: string[];
}

function setup({ onChange, optionValues, value }: Setup) {  
  const innerOption = (item: string) => ({ isSelected, isActive }: { isSelected: string; isActive: string }) => (
    `${item} ${isSelected ? "(selected)" : ""} ${isActive ? "(active)" : ""}`
  )
  
  render(
    <Listbox multiselect onChange={onChange} values={value}>
      {({ isOpen }: { isOpen: boolean }) => (
        <>
          <ListboxLabel>Select something</ListboxLabel>
          <ListboxButton>{({ isFocused }) => <>{isFocused ? "Click me (focused)" : "Click me"}</>}</ListboxButton>
          {isOpen && <ListboxList>
            <ListboxOption value={optionValues[0]}>{innerOption("Item 0")}</ListboxOption>
            <ListboxOption value={optionValues[1]}>{innerOption("Item 1")}</ListboxOption>
            <ListboxOption value={optionValues[2]}>{innerOption("Item 2")}</ListboxOption>
            <ListboxOption value={optionValues[3]}>{innerOption("Item 3")}</ListboxOption>
          </ListboxList>}
        </>
      )}
    </Listbox>
  )
}
