import './App.css';
import Filters from './Components/Filters';
import "bootstrap/dist/css/bootstrap.min.css";
import USERDATA from "./data.json";
import { useEffect, useState } from 'react';

function App() {
  const [userData, setUserData] = useState([]);
  const [locations, setLocations] = useState([]);

  const extractLocations = (data) => {
    let _locations = new Set();
    data.forEach(user => {
      _locations.add(user.location);
    })
    setLocations(Array.from(_locations));
  }

  useEffect(() => {
    if (USERDATA && Array.isArray(USERDATA)) {
      setUserData(USERDATA);
      extractLocations(USERDATA);
    }
  }, []);
  return (
    <div className="App">
      <div className="app-content">
        <header>
          <div className='app-title mb-2'> Users Management</div>
          <div className='filters-container'>
            <Filters
              locations={locations}
            />
          </div>
        </header>

      </div>
    </div>
  );
}

export default App;
