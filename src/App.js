import { useState, useEffect } from 'react';
import * as api from './api';
import { BrowserRouter as Router, Route, Switch} from 'react-router-dom'

import Homepage from './pages/Homepage';
import Customers from './pages/Customers';
import SiteHeader from './components/SiteHeader';
import TravelPackages from './pages/TravelPackage';
import Order from './pages/Order'

function App() {
  const [state, setState] = useState({});
  const [data, setData] = useState([]);
  
  useEffect(() => {
    const fetchData = async()=>{
      const result = await api.readCustomers()
      console.log(result)
      setData(result.data)
    }
    fetchData ()
  }, [])
  return (
    <Router>
      <div className='App'>
        <div className="d-flex justify-content-center">
          <SiteHeader />
          <div className='mt-20'>
            <Switch>
              <Router exact path="/">
                <Homepage />
              </Router>
              <Router path="/customer">
                <Customers />
              </Router>
              <Router path="/travelpackage">
                <TravelPackages />
              </Router>
              <Router path="/order">
                <Order />
              </Router>
            </Switch>
          </div>
        </div>
      </div>
    </Router>
  );
}

export default App;
