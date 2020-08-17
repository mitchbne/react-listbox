<h2 align="center">
  React Listbox
</h2>

<p align="center">
  A React implementation to the Vue Listbox component designed by TailwindLabs
</p>

<p align="center">
  <a href="https://www.npmjs.com/package/@mitchbne/react-listbox"><img src="https://img.shields.io/npm/v/@mitchbne/react-listbox?style=flat-square"></a>
  <a href="https://www.npmjs.com/package/@mitchbne/react-listbox"><img src="https://img.shields.io/npm/dm/@mitchbne/react-listbox?style=flat-square"></a>
  <a href="https://github.com/mitchbne/react-listbox/actions"><img src="https://img.shields.io/github/workflow/status/mitchbne/react-listbox/CI/master?style=flat-square"></a>
</p>

---

React Listbox is a context driven component system that allows developers to create a <a href="https://www.w3.org/TR/wai-aria-practices-1.1/#Listbox">Listbox</a> built with React.

Personally, I use a CSS framework called <a href="https://tailwindcss.com/">TailwindCSS</a> created by the team at TailwindLabs. Tailwind CSS is a highly customizable, low-level CSS framework that gives you all of the building blocks you need to build bespoke designs without any annoying opinionated styles you have to fight to override.

Recently the developers at TailwindLabs <a href="https://github.com/tailwindlabs/tailwindui-vue">implemented a Listbox component API</a> (just like this one) built for Vue developers. They promised that they would begin working on a React implementation of the Listbox soon, but I couldn't wait. In the meantime I've created this solution, maybe it will help you too.

_**Note: This solution comes completely unstyled. You will need to style it yourself.**_

### Demo
<a href="https://react-listbox.vercel.app" target="_blank" rel="noopener noreferrer">https://react-listbox.vercel.app</a>

### Getting Started
This package is meant to work alongisde any React application. Simply add the package to your list of dependencies, and make awesome projects 😎.

```bash
yarn add @mitchbne/react-listbox
```

### To Do
- [x] Create a JSX replication of TailwindLab's Vue Listbox <a href="https://github.com/tailwindlabs/tailwindui-vue">solution</a>.
- [x] Add Typescript support for components.
- [x] Turn the components into an installable library.
- [ ] Add support for the ListboxList component to be a React Portal.
- [ ] Create a multi-select solution.
- [ ] Handle disabled ListboxOption
- [ ] Fix where ListboxOption value and innerText are different (for typeahead)
- [ ] Create an input-filter solution.

### Basic Example
```jsx
import React, { useState, Fragment } from "react"
import { Listbox, ListboxLabel, ListboxButton, ListboxList, ListboxOption } from "@mitchbne/react-listbox"

export const SelectMenu = () => {
  const [selectedOption, setSelectedOption] = useState("Option 1")
  const options = [
    "Option 1",
    "Option 2",
    "Option 3",
  ]

  return (
    <Listbox onChange={setSelectedOption} value={selectedOption}>
        <Fragment>
          <ListboxLabel>
            Select an option:
          </ListboxLabel>
          <ListboxButton>
              { selectedOption ? selectedOption : "Select an option" }
          </ListboxButton>
            <ListboxList>
              { options.map(option => (
                <ListboxOption key={option} value={option}> {option} </ListboxOption>
              ))}
            </ListboxList>
          )}
        </Fragment>
      )}
    </Listbox>
  )
}
```
### TailwindCSS Example
```jsx
import React, { useState, Fragment } from "react"
import { Listbox, ListboxLabel, ListboxButton, ListboxList, ListboxOption } from "@mitchbne/react-listbox"

export const SelectMenu = () => {
  const [selectedWrestler, setSelectedWrestler] = useState("Ric Flair")
  const wrestlers = [
    "Stone Cold Steven Austin",
    "Bret Hart",
    "Ric Flair",
    "Macho Man Randy Savage",
    "Jake The Snake Roberts",
    "The Undertaker",
    "Hulk Hogan",
    "Rikishi",
    "John Cena",
    "Shawn Micahels",
    "British Bulldog",
    "Superfly Jimmy Snuka",
    "The Ultimate Warrior",
    "Andre The Giant",
    "Doink The Clown",
  ]

  return (
    <Listbox className="relative" onChange={setSelectedWrestler} value={selectedWrestler}>
      {({ isOpen }) => (
        <Fragment>
          <ListboxLabel className="block mb-1">
            Select a wrestler:
          </ListboxLabel>
          <ListboxButton className="w-full focus:outline-none">
            {({ isFocused }) => (
              <span className={`rounded px-3 py-2 border w-full text-left inline-flex items-center justify-between ${isFocused || isOpen ? "border-blue-300 shadow-outline": "border-gray-300"}`}>
                { selectedWrestler ? selectedWrestler : "Select a wrestler" }
                <svg className="h-5 w-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                  <path clipRule="evenodd" d="M10 3a1 1 0 01.707.293l3 3a1 1 0 01-1.414 1.414L10 5.414 7.707 7.707a1 1 0 01-1.414-1.414l3-3A1 1 0 0110 3zm-3.707 9.293a1 1 0 011.414 0L10 14.586l2.293-2.293a1 1 0 011.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" fillRule="evenodd" />
                </svg>
              </span>
            )}
          </ListboxButton>
          {isOpen && (
            <ListboxList className="w-full mt-2 absolute focus:outline-none max-h-56 border shadow rounded-md overflow-y-auto">
              { wrestlers.map(wrestler => (
                <ListboxOption className="curor-default select-none" key={wrestler} value={wrestler}>
                  {({ isActive, isSelected }) => (
                    <div className={`relative px-2 py-2 ${isActive ? " bg-blue-600 text-white" : ""}`}>
                      {wrestler}
                      { isSelected && (
                        <span className="absolute inset-y-0 right-1 flex items-center">
                          <svg className={`h-5 w-5 ${isActive ? "text-white": "text-gray-700" }`} fill="currentColor" viewBox="0 0 20 20">
                            <path clipRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" fillRule="evenodd" />
                          </svg>
                        </span>
                      )}
                    </div>
                  )}
                </ListboxOption>
              ))}
            </ListboxList>
          )}
        </Fragment>
      )}
    </Listbox>
  )
}

export default null
```
