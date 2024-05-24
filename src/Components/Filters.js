import React, { useEffect, useRef, useState } from 'react'
import "./filters.css";
import { ReactComponent as DropdownIcon } from "../graphics/icons/dropdown.svg";

let g_ddMenuOpen = false;
let searchBoxFocused = false;
function Filters(props) {
    const { locations, loggedInManager, selectedLocation, setSelectedLocation, searchTxt, setSearchTxt, applySearch } = props;
    const [ddMenuOpen, setddMenuOpen] = useState(false);
    const dropDownConatiner = useRef(null);
    const dropDownButton = useRef(null);
    const dropDownMenu = useRef(null);

    const ddButtonTitle = (<> <span>{selectedLocation == "All" ? 'Filter by' : selectedLocation}</span> <DropdownIcon className='dd-icon' /> </>);


    const toggleDropdownMenu = (value) => {
        setddMenuOpen(value);
        g_ddMenuOpen = value;
    }

    const decideDropdownMenuClose = (evt) => {
        let ddButtonClicked = dropDownButton.current.contains(evt.target);
        let ddMenuClicked = false;
        try {
            ddMenuClicked = dropDownMenu.current.contains(evt.target);
        } catch {
            ddMenuClicked = false;
        }

        if (ddButtonClicked) {
            toggleDropdownMenu(!g_ddMenuOpen);
        } else if (!ddMenuClicked) {
            toggleDropdownMenu(false);
        }
    }

    const detectEnterKey = (evt) => {
        const enterKeyCode = 13;
        if (evt.keyCode === enterKeyCode && searchBoxFocused) {
            applySearch();
        }

    }

    useEffect(() => {
        document.addEventListener("click", decideDropdownMenuClose);
        document.addEventListener("keypress", detectEnterKey);

        return () => {
            document.removeEventListener("click", decideDropdownMenuClose);
            document.removeEventListener("keypress", detectEnterKey);

        }
    }, [])

    useEffect(() => {
        if (Array.isArray(locations) && locations.length > 0) {
            setSelectedLocation(locations[0]);
        }
    }, [locations]);

    return (
        <>
            <div className='search-box-container'>
                <input
                    onFocus={() => { searchBoxFocused = true }}
                    onBlur={() => { searchBoxFocused = false }}
                    value={searchTxt}
                    onChange={(x) => setSearchTxt(x.target.value)}
                    type="text" placeholder='Search'
                />
                <button className='search-txt-button' onClick={applySearch}><i className="fa fa-search lens-icon"></i></button>
            </div>
            <div className='filter-dd-container' ref={dropDownConatiner}>
                <button ref={dropDownButton} className={ddMenuOpen ? `dd-active dd-button` : `dd-button`}>{ddButtonTitle}</button>
                <DDMenu
                    ddMenuOpen={ddMenuOpen}
                    reff={dropDownMenu}
                    toggleDropdownMenu={toggleDropdownMenu}
                    locations={locations}
                    selectedLocation={selectedLocation}
                    setSelectedLocation={setSelectedLocation}
                    loggedInManager={loggedInManager}
                />
            </div>
        </>
    )
}

export default Filters;

function DDMenu(props) {
    const { ddMenuOpen, reff, toggleDropdownMenu, locations, selectedLocation, setSelectedLocation, loggedInManager } = props;
    const [subMenuOpen, setSubMenuOpen] = useState(false);
    const subMenuItemRef = useRef(null);
    const subMenuListRef = useRef(null);

    const decideSubMenuClose = (evt) => {
        let subMenuItemClicked = false;
        let subMenuListClicked = false;

        try { subMenuItemClicked = subMenuItemRef.current.contains(evt.target); }
        catch { subMenuItemClicked = false; }

        try { subMenuListClicked = subMenuListRef.current.contains(evt.target); }
        catch { subMenuListClicked = false; }

        if (subMenuListClicked) {
            setSubMenuOpen(false);
            toggleDropdownMenu(false);
        } else if (subMenuItemClicked) {
            setSubMenuOpen(true);
        } else {
            setSubMenuOpen(false);
            toggleDropdownMenu(false);
        }
    }

    useEffect(() => {
        document.addEventListener("click", decideSubMenuClose);

        return () => {
            document.removeEventListener("click", decideSubMenuClose);
        }
    }, [])

    const subMenuItem = (<> <span>{selectedLocation}</span> <DropdownIcon className='dd-icon' /> </>);
    return (
        <>
            {ddMenuOpen ?
                <div ref={reff} className='dd-menu-container'>
                    <div className='dd-menu-list'>
                        <div className='list-groups'> Location </div>
                        <div className={subMenuOpen ? `dd-active list-item` : `list-item`}>
                            <div className='sub-menu' ref={subMenuItemRef}>
                                <div className='sub-menu-item'>
                                    {subMenuItem}
                                </div>
                                <SubMenuList
                                    subMenuOpen={subMenuOpen}
                                    subMenuListRef={subMenuListRef}
                                    locations={locations}
                                    selectedLocation={selectedLocation}
                                    setSelectedLocation={setSelectedLocation}
                                />
                            </div>
                        </div>
                        <div className='list-groups'> Manager </div>
                        <div className='list-item disabled'> <span className='bordered'>{loggedInManager}</span></div>
                    </div>
                </div>
                : null}
        </>
    );
}

function SubMenuList(props) {
    const { subMenuOpen, subMenuListRef, locations, selectedLocation, setSelectedLocation } = props;
    const locationList = locations.map(location => {
        let _class = (location == selectedLocation) ? "list-item-selected" : "";
        return (
            <div key={location}
                className={`list-item ${_class}`}
                onClick={() => setSelectedLocation(location)}>
                {location}
            </div>);
    });
    return (
        <>{subMenuOpen ?
            <div className='sub-menu-item-list' ref={subMenuListRef}>
                {locationList}
            </div>
            : null}
        </>
    );
}