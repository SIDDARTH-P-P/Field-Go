import React from 'react';


const CustomTabPanel = ({ value, index, children }) => {
  return (
    <div hidden={value !== index}>
      {value === index && (
        <div>
          {children}
        </div>
      )}
    </div>
  );
};



export default CustomTabPanel;
