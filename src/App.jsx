
import './App.css'
import Home from './Components/Home'
import ToDoList from './Components/ToDoList'
import { BrowserRouter as Router, Routes,Route } from 'react-router-dom';

function App() {

  return (
    <div>
      <Router>
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/to-do-list' element={<ToDoList/>}/>
        </Routes>
      </Router>
    </div>
  )
}

export default App
