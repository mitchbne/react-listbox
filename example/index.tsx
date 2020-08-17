import "react-app-polyfill/ie11"
import * as React from "react"
import * as ReactDOM from "react-dom"
import { AlternativeSelectMenu } from "./AlternativeSelectMenu"
import { SelectMenu } from "./SelectMenu"

const App = (): React.ReactNode => (
  <div className="bg-cool-gray-100 min-h-screen w-full antialiased py-20">
    <div className="mx-auto max-w-xs ">
      <div className="w-full flex flex-col space-y-4">
        <SelectMenu />
        <AlternativeSelectMenu />
      </div>
    </div>
  </div>
)

ReactDOM.render(<App />, document.getElementById("root"))
