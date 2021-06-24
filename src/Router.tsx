import { BrowserRouter, Route, Switch } from 'react-router-dom'

import { Home } from './pages/Home'
import { NewRoom } from './pages/NewRoom'
import { Room } from './pages/Room'
import { RoomAdmin } from './pages/RoomAdmin'

import { AuthContextProvider } from './contexts/AuthContext'

export function Router() {
  return (
    <BrowserRouter>
      <AuthContextProvider>
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/rooms/new" component={NewRoom} />
          <Route path="/rooms/:id" component={Room} />

          <Route path="/admin/rooms/:id" component={RoomAdmin} />
        </Switch>
      </AuthContextProvider>
    </BrowserRouter>
  )
}
