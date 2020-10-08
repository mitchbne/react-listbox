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
  const optionValues = ["item1", "item2", "item3"]
  const value = "item2"
  
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
    })

    it("then displays the listbox", () => {
      expect(screen.getByRole("listbox")).toBeInTheDocument()
    })

    describe("when clicking on an option", () => {
      beforeEach(() => {
        const [option] = screen.getAllByRole("option")
        userEvent.click(option)
        // Flush out async focus code
        jest.runAllTimers()
      })

      it("then calls onChange", () => {
        expect(onChange).toHaveBeenCalledWith(optionValues[0])
      })

      it("then closes the list", () => {
        expect(screen.queryByRole("listbox")).not.toBeInTheDocument();
      })
    })
  })

  describe("when focus shifts to the button", () => {
    beforeEach(() => {
      setup({ onChange, optionValues, value })
      userEvent.tab()
    })

    it("the button appears focused", () => {
      const button = screen.getByRole("button")
      expect(button).toHaveTextContent("Click me (focused)")
    })
  })
  

  describe("given an option is selected", () => {
    beforeEach(() => {
      setup({ onChange, optionValues, value })
      userEvent.click(screen.getByText("Click me"))
    })
    
    it("has a selected state", () => {
      const option = screen.getByText("Item 2 selected")
      expect(option).toBeInTheDocument()
    })
  })

  describe("given an option is NOT selected", () => {
    beforeEach(() => {
      setup({ onChange, optionValues, value: "item1" })
      userEvent.click(screen.getByText("Click me"))
    })
    
    it("has a selected state", () => {
      const option = screen.getByText("Item 2 not selected")
      expect(option).toBeInTheDocument()
    })
  })

  describe("given an option is active", () => {
    beforeEach(() => {
      setup({ onChange, optionValues, value })
      userEvent.click(screen.getByText("Click me"))
      // NOT active before hover
      userEvent.hover(screen.getByText("Item 3 not active"))
    })
    
    it("has a selected state", () => {
      const option = screen.getByText("Item 3 active")
      expect(option).toBeInTheDocument()
    })
  })  
})

interface Setup {
  onChange: () => void;
  optionValues: string[];
  value: string;
}

function setup({ onChange, optionValues, value }: Setup) {
  render(
    <Listbox onChange={onChange} value={value}>
      {({ isOpen }: { isOpen: boolean }) => (
        <>
          <ListboxLabel>Select something</ListboxLabel>
          <ListboxButton>{({ isFocused }) => <>{isFocused ? "Click me (focused)" : "Click me"}</>}</ListboxButton>
          {isOpen && <ListboxList>
            <ListboxOption value={optionValues[0]}>Item 1</ListboxOption>
            <ListboxOption value={optionValues[1]}>{({ isSelected }) => <>{isSelected ? "Item 2 selected" : "Item 2 not selected"}</>}</ListboxOption>
            <ListboxOption value={optionValues[2]}>{({ isActive }) => <>{isActive ? "Item 3 active" : "Item 3 not active"}</>}</ListboxOption>
          </ListboxList>}
        </>
      )}
    </Listbox>
  )
}
