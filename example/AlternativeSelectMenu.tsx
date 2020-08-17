import React, { useState, Fragment } from "react"
import { Listbox, ListboxLabel, ListboxButton, ListboxList, ListboxOption } from "../."

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
