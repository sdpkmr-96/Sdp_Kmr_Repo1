import './App.css';
import Filters from './Components/Filters';
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  return (
    <div className="App">
        <div className="app-content">
          <header>
            <div className='app-title mb-2'> Users Management</div>
            <div className='filters-container'>
              <Filters />
            </div>
          </header>

        </div>
    </div>
  );
}

export default App;
