import React, { useState } from "react"
import { Listbox, ListboxLabel, ListboxButton, ListboxList, ListboxOption } from "./Listbox"

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
        <>
          <ListboxLabel className="sr-only">
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
                        <span className="absolute inset-y-0 right-0 flex items-center">
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
        </>
      )}
    </Listbox>
  )
}

export default null
