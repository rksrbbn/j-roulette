import React from 'react';

const RouletteFormTwo = ({ nextStep, prevStep, handleChange, values }) => {
  return (
    <div>
      <input
        type="email"
        placeholder="Email"
        value={values.email}
        onChange={handleChange('email')}
      />
      <button onClick={prevStep}>Back</button>
      <button onClick={nextStep}>Next</button>
    </div>
  );
};

export default RouletteFormTwo;
