import React from "react"
import { BrowserRouter, Route } from "react-router-dom"
import { AuthContextProvider } from "./contexts/AuthContext"
import { Home } from "./pages/Home"
import { NewRoom } from "./pages/NewRoom"

function App() {
  return (
    <BrowserRouter>
      <AuthContextProvider>
          <Route path="/" component={Home} exact />
          <Route path="/rooms/new" component={NewRoom} />
          <Route path="/rooms/:id" component={Room} />
      </AuthContextProvider>
    </BrowserRouter>
  )
}

export default App
