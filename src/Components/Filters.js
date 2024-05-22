import React, { useEffect, useRef, useState } from 'react'
import "./filters.css";
import { ReactComponent as DropdownIcon } from "../graphics/icons/dropdown.svg";

let g_ddMenuOpen = false;
function Filters(props) {
    const { locations } = props;
    const [ddMenuOpen, setddMenuOpen] = useState(false);
    const [selectedLocation, setSelectedLocation] = useState(locations[0]);
    const dropDownConatiner = useRef(null);
    const dropDownButton = useRef(null);
    const dropDownMenu = useRef(null);

    const ddButtonTitle = (<> <span>Filter by</span> <DropdownIcon className='dd-icon' /> </>);


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

    useEffect(() => {
        document.addEventListener("click", decideDropdownMenuClose);

        return () => {
            document.removeEventListener("click", decideDropdownMenuClose);
        }
    }, [])

    return (
        <>
            <div className='search-box-container'>
                <input type="text" placeholder='Search' />
                <i className="fa fa-search lens-icon"></i>
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
                />
            </div>
        </>
    )
}

export default Filters;

function DDMenu(props) {
    const { ddMenuOpen, reff, toggleDropdownMenu, locations, selectedLocation, setSelectedLocation } = props;
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
                        <div className='list-item disabled'> <span className='bordered'>Adam Gray</span></div>
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
        return (<div className={`list-item ${_class}`} onClick={() => setSelectedLocation(location)}> {location} </div>);
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