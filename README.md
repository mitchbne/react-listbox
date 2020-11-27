
<h4 align="center">
 This repository is no longer actively maintained. Please checkout the <a href="https://github.com/tailwindlabs/headlessui/tree/develop/packages/%40headlessui-react">official HeadlessUI listbox component</a> designed by TailwindLabs.
</h4>

---

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

Made with love ❤️

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
- [x] Home (key) moves the focus and activeItem to the first option.
- [x] End (key) moves the focus and activeItem to the last option.
- [x] Selects/focus the first selected option when opened (`if activeItem == null`)
- [x] Create a multi-select solution.
  - [x] Multi selects focus the first selected option when opened
  - [x] Shift + Down Arrow: Moves focus to and toggles the selected state of the next option.
  - [x] Shift + Up Arrow: Moves focus to and toggles the selected state of the previous option.
  - [x] Shift + Space: Selects contiguous items from the most recently selected item to the focused item.
  - [x] Control + Shift + Home: Selects the focused option and all options up to the first option. Optionally, moves focus to the first option.
  - [x] Control + Shift + End: Selects the focused option and all options down to the last option. Optionally, moves focus to the last option.
  - [x] Control + A: Selects all options in the list. Optionally, if all options are selected, it may also unselect all options.
- [ ] Add support for the ListboxList component to be a React Portal.
- [ ] Handle disabled ListboxOption
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

### Advanced TailwindCSS Example
```jsx
import React, { useState, Fragment } from "react"
import { Listbox, ListboxLabel, ListboxButton, ListboxList, ListboxOption } from "@mitchbne/react-listbox"

export const AlternativeSelectMenu = (): React.ReactNode => {
  const [selectedPersonId, setSelectedPersonId] = useState("2f8807fd-f9ec-4b52-ad01-51f9d714e3d2")
  const people = [
    { id: "5bbb4afc-d23d-4f33-b84a-251f0aafe8d4", name: "Mr. Louisa Durgan", avatar: "https://s3.amazonaws.com/uifaces/faces/twitter/jagan123/128.jpg" },
    { id: "807e05d8-0896-42e0-9f9f-12c493be0da5", name: "Maudie Collier II", avatar: "https://s3.amazonaws.com/uifaces/faces/twitter/ruehldesign/128.jpg" },
    { id: "2f8807fd-f9ec-4b52-ad01-51f9d714e3d2", name: "Torrance Kuvalis", avatar: "https://s3.amazonaws.com/uifaces/faces/twitter/homka/128.jpg" },
    { id: "7b90f1de-cd62-4cef-84ea-9900dc42ff94", name: "Ansley Ferry", avatar: "https://s3.amazonaws.com/uifaces/faces/twitter/bassamology/128.jpg" },
    { id: "387416e6-dcd0-4acc-a33b-1a3045bbd00c", name: "Tyree Ortiz", avatar: "https://s3.amazonaws.com/uifaces/faces/twitter/tom_even/128.jpg" },
    { id: "8a8b98b5-52d7-4480-9983-1f09f9e0bd5b", name: "Maxwell Predovic II", avatar: "https://s3.amazonaws.com/uifaces/faces/twitter/evandrix/128.jpg" },
    { id: "e800caed-40e5-47b1-be64-da445f78c395", name: "Frederik Bernhard", avatar: "https://s3.amazonaws.com/uifaces/faces/twitter/antonyzotov/128.jpg" },
    { id: "35a46ffa-0622-44a9-b3dc-52554ca37be6", name: "Mr. Aaliyah Parisian", avatar: "https://s3.amazonaws.com/uifaces/faces/twitter/Karimmove/128.jpg" },
    { id: "0607c49a-140e-42c8-96c0-cb92347b1da7", name: "Fidel Keebler", avatar: "https://s3.amazonaws.com/uifaces/faces/twitter/michzen/128.jpg" },
    { id: "7a929850-dfb3-4746-bdcb-3d708c63df99", name: "Rosalind Monahan", avatar: "https://s3.amazonaws.com/uifaces/faces/twitter/motionthinks/128.jpg" },
    { id: "dbea32bc-27da-4651-a7e9-9d0bc2616406", name: "Serenity Lemke", avatar: "https://s3.amazonaws.com/uifaces/faces/twitter/cdavis565/128.jpg" },
    { id: "e9ed9aae-e6a5-4496-8c54-c9ec7aef7561", name: "Jazmyn Roberts", avatar: "https://s3.amazonaws.com/uifaces/faces/twitter/pmeissner/128.jpg" },
    { id: "276bf817-ada7-4f81-8b2e-6ae879b7031f", name: "Kailee Stoltenberg", avatar: "https://s3.amazonaws.com/uifaces/faces/twitter/tobysaxon/128.jpg" },
    { id: "ecf05d1f-892c-423e-9e58-e5e220a1d04a", name: "Heber Carter", avatar: "https://s3.amazonaws.com/uifaces/faces/twitter/caseycavanagh/128.jpg" },
    { id: "9ed04a2e-1e4d-4acf-9732-e5cd1683728f", name: "Boris Sauer III", avatar: "https://s3.amazonaws.com/uifaces/faces/twitter/ganserene/128.jpg" },
  ]
  const selectedPerson = people.find(person => selectedPersonId === person.id)

  return (
    <Listbox className="relative" onChange={setSelectedPersonId} value={selectedPersonId}>
      {({ isOpen }) => (
        <Fragment>
          <ListboxLabel className="block mb-1">
            Assign project to:
          </ListboxLabel>
          <ListboxButton className="w-full focus:outline-none">
            {({ isFocused }) => (
              <span className={`rounded px-3 py-2 border w-full text-left bg-white inline-flex items-center justify-between ${isFocused || isOpen ? "border-blue-300 shadow-outline": "border-gray-300"}`}>
                <span className="inline-flex items-center space-x-3">
                  { selectedPersonId ? (
                    <Fragment>
                      <img alt={selectedPerson?.name} className="h-6 w-6 rounded-full " src={selectedPerson?.avatar} />
                      <span>{selectedPerson?.name}</span>
                    </Fragment>
                  ) : "Select a person..."}
                </span>
                <svg className="h-5 w-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                  <path clipRule="evenodd" d="M10 3a1 1 0 01.707.293l3 3a1 1 0 01-1.414 1.414L10 5.414 7.707 7.707a1 1 0 01-1.414-1.414l3-3A1 1 0 0110 3zm-3.707 9.293a1 1 0 011.414 0L10 14.586l2.293-2.293a1 1 0 011.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" fillRule="evenodd" />
                </svg>
              </span>
            )}
          </ListboxButton>
          {isOpen && (
            <ListboxList className="w-full mt-2 absolute focus:outline-none max-h-56 border shadow rounded-md overflow-y-auto bg-white z-40">
              { people.map(person => (
                <ListboxOption className="curor-default select-none" key={person.id} value={person.id}>
                  {({ isActive, isSelected }) => (
                    <div className={`flex items-center relative px-2 py-2 ${isActive ? " bg-blue-600 text-white" : ""}`}>
                      <span className="inline-flex items-center space-x-3">
                        <img alt={person.name} className="h-6 w-6 rounded-full" src={person.avatar} />
                        <span>{person.name}</span>
                      </span>
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
