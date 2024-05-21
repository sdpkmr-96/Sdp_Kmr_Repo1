import React from 'react'
import Dropdown from 'react-multilevel-dropdown';
import "./filters.css";

function Filters() {

    const ddIcon = (<i class="fa fa-caret-down m-1"></i>);
    return (
        <>
            <div className='search-box-container'>
                <input type="text" placeholder='Search' /> 
                <i className="fa fa-search lens-icon"></i>
            </div>
            <div className='filter-dd-container'>
                <Dropdown title={<>{"Filter by"} {ddIcon}</>} position='right' className="dd-arrow">
                    <p className='dd-groups'> Location </p>
                    <Dropdown.Item >
                        {"Bangalore"} {ddIcon}
                        <Dropdown.Submenu position='right'>
                            <Dropdown.Item>
                                Subitem 1
                            </Dropdown.Item>
                        </Dropdown.Submenu>
                    </Dropdown.Item>
                    <p className='dd-groups'> Manager </p>
                    <Dropdown.Item >
                        Item 1
                    </Dropdown.Item>
                </Dropdown>
            </div>
        </>
    )
}

export default Filters