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

describe("given listbox is determined by isOpen prop", () => {
  const onChange = jest.fn()
  const optionValues = ["item1", "item2", "item3"]
  
  beforeEach(() => {
    render(
      <Listbox onChange={onChange} value="selectedVal">
        {({ isOpen }: { isOpen: boolean }) => (
          <>
            <ListboxLabel>Select something</ListboxLabel>
            <ListboxButton>Click me</ListboxButton>
            {isOpen && <ListboxList>
              <ListboxOption value={optionValues[0]}>Item 1</ListboxOption>
              <ListboxOption value={optionValues[1]}>Item 2</ListboxOption>
              <ListboxOption value={optionValues[2]}>Item 3</ListboxOption>
            </ListboxList>}
          </>
        )}
      </Listbox>
    )
  })

  describe("when clicking on the button", () => {
    beforeEach(() => {
      screen.getByRole("button").click()
    })

    it("then displays the listbox", () => {
      const listbox = screen.getByRole("listbox")

      expect(listbox).toBeInTheDocument()
    })

    describe("when clicking on an option", () => {
      it("then calls onChange", () => {
        const [option] = screen.getAllByRole("option")
        userEvent.click(option)
        
        expect(onChange).toHaveBeenCalledWith(optionValues[0])
      })
    })
  })  
})
