import React from 'react'
import { BrowserRouter,Routes,Route } from 'react-router-dom'
import Home from './pages/Home';
import Create from './pages/Create';
import Read from './pages/Read';
import Update from './pages/Update';
const App = () => {
  return (
   <BrowserRouter>
   <Routes>
    <Route  path='/'  Component={Home}  />
    <Route  path='create/'  Component={Create}  />
    <Route  path='read/:id'  Component={Read}  />
    <Route  path='update/:id'  Component={Update}  />
       </Routes>
   </BrowserRouter>
  )
}

export default App