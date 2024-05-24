import React from 'react'
import Card from 'react-bootstrap/Card';
import { Row, Col } from 'react-bootstrap';
import "./cardComp.css";
import { ReactComponent as TickIcon } from "../graphics/icons/tick.svg";

function CardComp(props) {
    const { user, key } = props;
    return (
        <Card key={key} className='card-comp'>
            <Card.Body>
                <Card.Subtitle className="mb-2 user-fullname">{`${user.firstName} ${user.lastName}`}</Card.Subtitle>
                <Card.Text>
                    <div className='card-employee-info'>
                        <Row>
                            <Col xl="6">
                                <div className='card-item-label'>Manager:&nbsp;</div><div className='card-item-value' >{user.manager}</div>
                            </Col>
                            <Col xl="6">
                                <div className='card-item-label'>Employee Id:&nbsp;</div><div className='card-item-value' >{user.employeeId}</div>
                            </Col>
                        </Row>
                    </div>
                    <UserProvStatus status={user.status} />
                    <Permissions permission={user.permission} />
                </Card.Text>
            </Card.Body>
        </Card>
    )
}

export default CardComp

function UserProvStatus(props) {
    const { status } = props; // 1,2,3,4
    const step = 33.33;
    const index = status - 1;
    const statusRodStyle = { backgroundImage: `linear-gradient( to right, green ${step * index}%, yellow ${step * index}% ${step * index + step}%, white ${step * index + step}% 100%)` }
    var _classNode = { first: "", second: "", third: "", forth: "" };

    switch (status) {
        case 1:
            _classNode.first = 'done';
            _classNode.second = 'pending';
            break;
        case 2:
            _classNode.first = 'done';
            _classNode.second = 'done';
            _classNode.third = 'pending';
            break;
        case 3:
            _classNode.first = 'done';
            _classNode.second = 'done';
            _classNode.third = 'done';
            _classNode.forth = 'pending';
            break;
        case 4:
            _classNode.first = 'done';
            _classNode.second = 'done';
            _classNode.third = 'done';
            _classNode.forth = 'done';
            break;

    }



    const statusBar = (
        <div className='status-bar-body'>
            <div className='status-bar-rod' style={statusRodStyle}></div>
            <div className={`status-bar-node first ${_classNode.first}`}>
                {status >= 1 ? < TickIcon className='progress-tick-icon' /> : null}
            </div>
            <div className={`status-bar-node second ${_classNode.second}`}>
                {status >= 2 ? < TickIcon className='progress-tick-icon' /> : null}
            </div>
            <div className={`status-bar-node third ${_classNode.third}`}>
                {status >= 3 ? < TickIcon className='progress-tick-icon' /> : null}
            </div>
            <div className={`status-bar-node forth ${_classNode.forth}`}>
                {status > 3 ? < TickIcon className='progress-tick-icon' /> : null}
            </div>
        </div>);
    return (
        <div className='user-status-container mt-1'>
            <div className='card-item-label'>User Provising Status</div>
            <div className='user-status-bar'>
                {statusBar}
            </div>
        </div>
    )
}

function Permissions(props) {
    const { permission } = props;

    const permDesc = [
        "Business Administrator (Office365 membership)",
        "Create Group in Corporate Active Directory",
        "Xanadu Financials (Corporate File Share) allow"
    ];
    const allowedPermissions = permDesc.slice(0, permission);
    return (
        <>
            <div className='card-sub-item-label mt-1'>Permissions:</div>
            <div className='card-sub-item-value'>
                <ul>
                    {allowedPermissions.map(per => <li>{per}</li>)}
                </ul>
            </div>
        </>
    )
}