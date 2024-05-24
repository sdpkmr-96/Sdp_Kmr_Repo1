import './App.css';
import Filters from './Components/Filters';
import "bootstrap/dist/css/bootstrap.min.css";
import USERDATA from "./data.json";
import { useEffect, useState } from 'react';
import { Tab, TabPanel, Tabs, TabList } from "react-tabs";
import 'react-tabs/style/react-tabs.css';
import UsersTab from "./tabs/UsersTab";
import { ReactComponent as GridIcon } from "./graphics/icons/grid2x2.svg";
import { ReactComponent as ListIcon } from "./graphics/icons/listbox.svg";

const layoutTypes = { grid: "GRID", list: "LIST" };
const tabIndexMap = { all: 0, myTeamUsers: 1 };
let SearchText = "";
let SelLocation = "All";
const permDesc = [
  "Business Administrator (Office365 membership)",
  "Create Group in Corporate Active Directory",
  "Xanadu Financials (Corporate File Share) allow"
];

function App() {
  const [userData, setUserData] = useState([]);
  const [locations, setLocations] = useState([]);
  const [loggedInManager, setLoggedInManager] = useState("Adam Gray");
  const [myTeamUsers, setMyTeamUsers] = useState([]);
  const [allTabLayout, setAllTabLayout] = useState(layoutTypes.grid);
  const [myTeamTabLayout, setMyTeamTabLayout] = useState(layoutTypes.grid);
  const [selectedTabIndex, setSelectedTabIndex] = useState(tabIndexMap.all);

  const [selectedLocation, setSelectedLocation] = useState("All");
  const [searchTxt, setSearchTxt] = useState("");

  const conatainsSearchTxt = (user, search) => {
    let flag = false;

    flag = (user.firstName.toLowerCase().includes(search) ||
      user.lastName.toLowerCase().includes(search) ||
      user.manager.toLowerCase().includes(search) ||
      user.employeeId.toLowerCase().includes(search) ||
      (user.permission == 1 && permDesc[0].toLowerCase().includes(search)) ||
      (user.permission == 2 && (permDesc[0].toLowerCase().includes(search) || permDesc[1].toLowerCase().includes(search))) ||
      (user.permission == 3 && (permDesc[0].toLowerCase().includes(search) || permDesc[1].toLowerCase().includes(search) || permDesc[2].toLowerCase().includes(search)))
    )

    return flag;
  }

  const filterUsers = (data, location, manager, search) => {
    let myTeamUsers = [];
    let allUsers = [];
    let uniqueLocations = new Set(['All']);

    if (!data) {
      return { allUsers, myTeamUsers, uniqueLocations };
    }
    location = (location ? location : null);
    manager = (manager ? manager : loggedInManager);
    search = (search ? search.toLowerCase() : "");


    data.forEach(user => {
      uniqueLocations.add(user.location);
      let addUser = conatainsSearchTxt(user, search);
      if (addUser) {
        if (location && location != "All") {
          if (location == user.location && user.manager == manager) {
            myTeamUsers.push(user);
            allUsers.push(user);
          } else if (location == user.location && user.manager !== manager) {
            allUsers.push(user);
          }

        } else {
          if (user.manager == manager) {
            myTeamUsers.push(user);
          }
          allUsers.push(user);
        }
      }
    });

    return { allUsers, myTeamUsers, uniqueLocations };
  }

  const processData = (data) => {
    let { allUsers, myTeamUsers, uniqueLocations } = filterUsers(data);
    setLocations(Array.from(uniqueLocations));
    setUserData(allUsers);
    setMyTeamUsers(myTeamUsers);
  }

  const onSelectTab = (selectedIndex) => {
    setSelectedTabIndex(selectedIndex);
  }

  const setCurrTabLayout = (type, tab) => {
    if (tab == tabIndexMap.all) {
      setAllTabLayout(type);
    } else if (tab == tabIndexMap.myTeamUsers) {
      setMyTeamTabLayout(type);
    }
  }

  const checkIsActive = (layout) => {
    let retActive = "active";

    if (selectedTabIndex == tabIndexMap.all) {
      if (layout == allTabLayout) {
        return retActive
      } else {
        return "";
      }
    } else if (selectedTabIndex == tabIndexMap.myTeamUsers) {
      if (layout == myTeamTabLayout) {
        return retActive
      } else {
        return "";
      }
    }
  }

  const applySearch = () => {
    let { allUsers, myTeamUsers } = filterUsers(USERDATA, SelLocation, loggedInManager, SearchText);
    setUserData(allUsers);
    setMyTeamUsers(myTeamUsers);
  }

  useEffect(() => {
    if (USERDATA && Array.isArray(USERDATA) && USERDATA.length > 0) {
      processData(USERDATA);
    }
  }, []);

  useEffect(() => {
    if (selectedLocation) {
      SelLocation = selectedLocation;
      applySearch();
    }
  }, [selectedLocation]);

  useEffect(() => { SearchText = searchTxt }, [searchTxt]);
  return (
    <div className="App">
      <div className="app-content">
        <header>
          <div className='app-title mb-2'> Users Management</div>
          <div className='filters-container'>
            <Filters
              locations={locations}
              loggedInManager={loggedInManager}
              selectedLocation={selectedLocation}
              setSelectedLocation={setSelectedLocation}
              searchTxt={searchTxt}
              setSearchTxt={setSearchTxt}
              applySearch={applySearch}
            />
          </div>
        </header>
        <div className='tabs-conatiner'>
          <Tabs onSelect={onSelectTab}>
            <TabList>
              <Tab >
                <label>All {userData.length}</label>
              </Tab>
              <Tab >
                <label>My Team Users {myTeamUsers.length}</label>
              </Tab>
              <div className='layout-icon-conatiner'>
                <div className={`layout-icon ${checkIsActive(layoutTypes.grid)}`} onClick={() => { setCurrTabLayout(layoutTypes.grid, selectedTabIndex) }}> <GridIcon className='grid-icon' /> </div>
                <div className={`layout-icon ${checkIsActive(layoutTypes.list)}`} onClick={() => { setCurrTabLayout(layoutTypes.list, selectedTabIndex) }}> <ListIcon className='list-icon' /> </div>
              </div>
            </TabList>

            <TabPanel >
              <UsersTab
                type="ALL"
                layoutTypes={layoutTypes}
                cardLayout={allTabLayout}
                data={userData}
              />
            </TabPanel>
            <TabPanel>
              <UsersTab
                type="MY_TEAM_USERS"
                layoutTypes={layoutTypes}
                cardLayout={myTeamTabLayout}
                data={myTeamUsers}
              />
            </TabPanel>
          </Tabs>
        </div>
      </div>
    </div>
  );
}

export default App;
