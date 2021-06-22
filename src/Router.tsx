import { BrowserRouter, Route } from 'react-router-dom'

import { Home } from './pages/Home'
import { NewRoom } from './pages/NewRoom'

import { AuthContextProvider } from './contexts/AuthContext'

export function Router() {
  return (
    <BrowserRouter>
      <AuthContextProvider>
        <Route path="/" exact component={Home}/>
        <Route path="/rooms/new" exact component={NewRoom}/>
      </AuthContextProvider>
    </BrowserRouter>
  )
}