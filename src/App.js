
import './App.css';
import LoadingBar from 'react-top-loading-bar'

import React, { useState } from 'react'
import NavBar from './components/NavBar';
import News from './components/News';
import { BrowserRouter , Routes , Route} from 'react-router-dom';

const App = () =>{
 const [progress , setProgress] = useState(0)
 /*eslint no-unused-expressions: ["error", { "allowTernary": true }]*/



 
  
    return(
      <div>
        <BrowserRouter>
        <NavBar/>
        <LoadingBar
        height = {3}
        color='#f11946'
        progress={progress}
      />
        <Routes>
          <Route exact strict path="/" element={<News setProgress={setProgress} key="general"  pageSize={6} country="in" category="general"/>}></Route>
          <Route exact strict path="/business" element={<News setProgress={setProgress}  key="business" pageSize={6} country="in" category="business"/>}></Route>
          <Route exact strict path="/entertainment" element={<News setProgress={setProgress} key="entertainment"  pageSize={6} country="in" category="entertainment"/>}></Route>
          <Route exact strict path="/general" element={<News setProgress={setProgress} key="general"  pageSize={6} country="in" category="general"/>}></Route>
          <Route exact strict path="/health" element={<News setProgress={setProgress} key="health"  pageSize={6} country="in" category="health"/>}></Route>
          <Route exact strict path="/science" element={<News setProgress={setProgress} key="science"  pageSize={6} country="in" category="science"/>}></Route>
          <Route exact strict path="/sports" element={<News setProgress={setProgress} key="sports"  pageSize={6} country="in" category="sports"/>}></Route>
          <Route exact strict path="/technology" element={<News setProgress={setProgress}  key="technology" pageSize={6} country="in" category="technology"/>}></Route>
        </Routes>
        </BrowserRouter>
        
      </div>
    )
  
}

export default App;