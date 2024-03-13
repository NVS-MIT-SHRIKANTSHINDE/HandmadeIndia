import React, { useState } from 'react';
import { Tooltip as ReactTooltip } from 'react-tooltip';
import MapChart from './MapChart';
import MapDialog from './MapDialog';
import StateProductList from '../flashDeals/StateProduct';

const AreaSelector = () => {
    const [content, setContent] = useState("");
    const [STName, setSTName] = useState("");
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);

    return (
        <React.Fragment>
            {/* <MapDialog show={show} StateName={STName} closeModal={handleClose} /> */}
            <div style={{ position: 'relative', backgroundColor: 'blue' }}>
                <MapChart setTooltipContent={setContent} setStateName={setSTName} setShowDistrict={setShow} />
                <ReactTooltip>{content}</ReactTooltip>
                <div style={{ position: 'absolute', top: '10px', right: '10px', color: 'white' }}>
                    <h1>{STName}</h1>
                </div>
            </div>
            <StateProductList stateName={STName} />
        </React.Fragment>
    );
}

export default AreaSelector;
