import React, { useState } from 'react';

const IndiaMap = () => {
  const [tooltip, setTooltip] = useState('');

  const handleRegionClick = (region) => {
    // Handle the click based on the region
    setTooltip(region);
  };

  const handleMapClick = () => {
    // Reset the tooltip when clicking on the map
    setTooltip('');
  };

  const stateData = [
    { name: 'Andhra Pradesh', capital: 'Amaravati' },
    { name: 'Arunachal Pradesh', capital: 'Itanagar' },
    { name: 'Assam', capital: 'Dispur' },
    { name: 'Bihar', capital: 'Patna' },
    { name: 'Chhattisgarh', capital: 'Raipur' },
    { name: 'Goa', capital: 'Panaji' },
    { name: 'Gujarat', capital: 'Gandhinagar' },
    { name: 'Haryana', capital: 'Chandigarh' },
    { name: 'Himachal Pradesh', capital: 'Shimla' },
    { name: 'Jharkhand', capital: 'Ranchi' },
    { name: 'Karnataka', capital: 'Bangalore' },
    { name: 'Kerala', capital: 'Thiruvananthapuram' },
    { name: 'Madhya Pradesh', capital: 'Bhopal' },
    { name: 'Maharashtra', capital: 'Mumbai' },
    { name: 'Manipur', capital: 'Imphal' },
    { name: 'Meghalaya', capital: 'Shillong' },
    { name: 'Mizoram', capital: 'Aizawl' },
    { name: 'Nagaland', capital: 'Kohima' },
    { name: 'Odisha', capital: 'Bhubaneshwar' },
    { name: 'Punjab', capital: 'Chandigarh' },
    { name: 'Rajasthan', capital: 'Jaipur' },
    { name: 'Sikkim', capital: 'Gangtok' },
    { name: 'Tamil Nadu', capital: 'Chennai' },
    { name: 'Telangana', capital: 'Hyderabad' },
    { name: 'Tripura', capital: 'Agartala' },
    { name: 'Uttarakhand', capital: 'Dehradun' },
    { name: 'Uttar Pradesh', capital: 'Lucknow' },
    { name: 'West Bengal', capital: 'Kolkata' },
  ];

  return (
    <div>
      <img
        src="\images\india.jpg"
        alt="India Map"
        width="209"
        height="242"
        useMap="#workmap"
        onClick={() => handleMapClick()}
      />

      {/* Tooltip to display the state name and capital */}
      {tooltip && (
        <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', backgroundColor: 'white', padding: '10px', border: '1px solid #ccc' }}>
          <p>{tooltip}</p>
        </div>
      )}

      <map name="workmap">
        {stateData.map((state) => (
          <area
            key={state.name}
            shape="rect"
            coords="83,41,57,63"
            alt={state.name}
            onClick={() => handleRegionClick(`${state.name} - ${state.capital}`)}
          />
        ))}
      </map>
    </div>
  );
};

export default IndiaMap;
