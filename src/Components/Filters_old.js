import React, { useState } from 'react'
import Dropdown from 'react-multilevel-dropdown';
import "./filters.css";
import { ReactComponent as DropdownIcon } from "../graphics/icons/dropdown.svg";

function Filters() {
    const [isDdActive, setIsDdActive] = useState(false);

    const ddButtonTitle = ( <> <span>Filter by</span> <DropdownIcon className='dd-icon first' /> </> );
    return (
        <>
            <div className='search-box-container'>
                <input type="text" placeholder='Search' />
                <i className="fa fa-search lens-icon"></i>
            </div>
            <div className='filter-dd-container'>
                <Dropdown isActive={isDdActive} onClick={(x)=>setIsDdActive(true)} title={ddButtonTitle} position='right' className="dd-button">
                    <p className='dd-groups'> Location </p>
                    <Dropdown.Item className='dd-items dd-item-with-menu'>
                        {"Bangalore"} <DropdownIcon className='dd-icon' />
                        <Dropdown.Submenu position='right'>
                            <Dropdown.Item className='dd-items' onClick={(x)=>console.log(x.isPropagationStopped())}>
                                Subitem 1
                            </Dropdown.Item>
                            <Dropdown.Item className='dd-items'>
                                Subitem 1
                            </Dropdown.Item>
                            <Dropdown.Item className='dd-items'>
                                Subitem 1
                            </Dropdown.Item>
                        </Dropdown.Submenu>
                    </Dropdown.Item >
                    <p className='dd-groups'> Manager </p>
                    <Dropdown.Item className='dd-items'>
                        Adam Gray
                    </Dropdown.Item>
                </Dropdown>
            </div>
        </>
    )
}

export default Filters