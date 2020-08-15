/* eslint-disable import/no-extraneous-dependencies */
import "react-app-polyfill/ie11"
import * as React from "react"
import * as ReactDOM from "react-dom"
import { SelectMenu } from "./SelectMenu"

const App = (): React.ReactNode => (
  <div className="bg-white min-h-screen w-full antialiased py-20">
    <div className="mx-auto max-w-xs">
      <SelectMenu />
    </div>
  </div>
)

ReactDOM.render(<App />, document.getElementById("root"))
/* eslint-enable import/no-extraneous-dependencies */
