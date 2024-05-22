import "./App.css";
import { useState, useEffect } from "react";
import { init } from "./utils/fhevm.jsx";


import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./Pages/LandingPage.jsx";
import CreateCompany from "./Pages/CreateCompany.jsx";
import CreateCompanyKey from "./Pages/CreateCompanyKey.jsx";
import CompanyKey from "./Pages/CompanyKey.jsx";
import Allocations from "./Pages/Allocations.jsx";
import AlreadyOwner from "./Pages/AlreadyOwner.jsx";
import Dashboard_emp from "./Pages/Dashboard_emp.jsx";
import EmployeeLogin from "./Pages/EmployeeLogin.jsx";
import Loader from "./Components/Loader.jsx";

function App() {
  const [isInitialized, setIsInitialized] = useState(true);

  useEffect(() => {
    init()
      .then(() => {
        setIsInitialized(true);
      })
      .catch(() => setIsInitialized(false));
  }, []);

  if (!isInitialized) return null;

  return (
    <>
      <Router>
        <Routes>
          <Route exact path="/" element={<LandingPage />} />
          <Route exact path="/createCompanyKey" element={<CreateCompanyKey />} />
          <Route exact path="/companyKey" element={<CompanyKey />} />
          <Route exact path="/allocations" element={<Allocations />} />
          <Route exact path="/alreadyOwner" element={<AlreadyOwner />} />
          <Route exact path="/dashboard" element={<Dashboard_emp />} />
          <Route exact path="/employeeLogin" element={<EmployeeLogin/>} />
          <Route exact path="/" element={<Loader />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
