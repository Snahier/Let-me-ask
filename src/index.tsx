import React from "react"
import ReactDOM from "react-dom"
import { ThemeProvider } from "styled-components/macro"
import App from "./App"
import "./services/firebase"
import { GlobalStyles } from "./styles/GlobalStyles"
import { light } from "./styles/theme"

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider theme={light}>
      <GlobalStyles />
      <App />
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById("root")
)
