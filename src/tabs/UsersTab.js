import React, { useState, useMemo } from 'react'
import CardComp from './CardComp.js';
import Pagination from '../libs/pagination/Pagination.js';
import "../tabs/cardComp.css";

let PageSize = 9;
function AllUsers(props) {
    const { data, cardLayout, layoutTypes } = props;
    const [currentPage, setCurrentPage] = useState(1);

    const currentTableData = useMemo(() => {
        const firstPageIndex = (currentPage - 1) * PageSize;
        const lastPageIndex = firstPageIndex + PageSize;
        return data.slice(firstPageIndex, lastPageIndex);
    }, [currentPage, data]);

    const cards = currentTableData.map(user => {
        return (<CardComp user={user} key={user.employeeId}/>)
    });

    const layoutClassName = (cardLayout == layoutTypes.list ? "card-list-Layout" : "card-grid-Layout")
    return (
        <>
            <div className={`users-container ${layoutClassName}`}>
                {cards}
            </div>
            <Pagination
                className="pagination-bar"
                currentPage={currentPage}
                totalCount={data.length}
                pageSize={PageSize}
                onPageChange={page => setCurrentPage(page)}
            />

        </>)
}

export default AllUsers