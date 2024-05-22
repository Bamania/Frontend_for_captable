import Dashboard from './Pages/Dashboard';
import Home from './Pages/Home';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './polyfills'
function App() {
  return (
    // <div className="">
    //   {/* <SideBar/> */}
    //   {/* <Navbar/> */}
    //   <Home/>
    //   {/* <Dashboard/> */}
    //   {/* <Add/> */}
    // </div>
    <Router>
      <Routes>
        <Route exact path="/" element={<Home />}/>
        
          <Route exact path="/allocations" element={<Dashboard />} />
          {/* <Route path="*" element={<Home />} /> */}
       
      </Routes>
    </Router>
  );
}

export default App;
