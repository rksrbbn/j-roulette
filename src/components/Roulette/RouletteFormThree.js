import React from 'react';

const RouletteFormThree = ({ prevStep, handleChange, values }) => {

  const handleSubmit = () => {
    // Handle form submission
    alert(JSON.stringify(values, null, 2));
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Address"
        value={values.address}
        onChange={(e) => handleChange('address')(e)}
      />
      <button onClick={prevStep}>Back</button>
      <button onClick={handleSubmit}>Submit</button>
    </div>
  );
};

export default RouletteFormThree;
