import React from "react"
import { BrowserRouter, Route } from "react-router-dom"
import { AuthContextProvider } from "./contexts/AuthContext"
import { Home } from "./pages/Home"
import { NewRoom } from "./pages/NewRoom"

function App() {
  return (
    <BrowserRouter>
      <AuthContextProvider>
        <Route exact path="/" component={Home} />
        <Route exact path="/rooms/new" component={NewRoom} />
      </AuthContextProvider>
    </BrowserRouter>
  )
}

export default App
