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

### Ooh, another repo....but what does it do???
I come across a lot of React libraries out there - some of them are great - and others leave me frustrated and angry. One of my biggest pet peeves is when a library forces you to use their CSS styles, and it completely contradicts the overall look and feel of your application. This library exposes an API of components that allow you to implement a Listbox solution in React - and you can style them how you want!

I won't deny that this library had a lot of inspiration from TailwindLabs' Vue Listbox solution (which you can find <a href="https://tailwindlabs/tailwindui-vue">here</a>). It was rumoured that they would start working on their own React implementation soon (and if they do, I will probably deprecate this repository in favour of their solution - but until then, I need the library myself for my own projects 😂)

### Getting Started
This package is meant to work alongisde any React application. Simply add the package to your list of dependencies, and make awesome projects 😎.

```bash
yarn add @mitchbne/react-listbox
```

### To Do
- [x] Create a JSX replication of TailwindLab's Vue Listbox solution
- [x] Add Typescript support for components
- [x] Turn the components into an installable library
- [ ] Add support for the ListboxList component to be a React Portal.

### Example Usage
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
