import {Route, Switch} from 'react-router-dom'

import LoginRoute from './components/LoginRoute'
import HomeRoute from './components/HomeRoute'
import MovieItemDetails from './components/MovieItemDetails'
import PopularRoute from './components/PopularRoute'
import ProtectedRoute from './components/ProtectedRoute'
import NotFoundRoute from './components/NotFoundRoute'
import AccountRoute from './components/AccountRoute'
import SearchRoute from './components/SearchRoute'
import './App.css'

const App = () => (
  <Switch>
    <Route exact path="/login" component={LoginRoute} />
    <ProtectedRoute exact path="/" component={HomeRoute} />
    <ProtectedRoute exact path="/movies/:id" component={MovieItemDetails} />
    <ProtectedRoute exact path="/popular" component={PopularRoute} />
    <ProtectedRoute exact path="/account" component={AccountRoute} />
    <ProtectedRoute exact path="/search" component={SearchRoute} />
    <Route component={NotFoundRoute} />
  </Switch>
)

export default App
