import React, { useState } from 'react';

const ChoiceList = ({ choices, selectedChoice, onSelect }) => {
  const [activeChoice, setActiveChoice] = useState(selectedChoice);

  const handleClick = (choice) => {
    setActiveChoice(choice);
    onSelect(choice);
  };

  return (
    <div className="choice-list">
        {/* <select
        value={selectedOption}
        onChange={e => handleChange(e.target.value, setSelectedOption)}>
        {options.map(o => (
          <option key={o.value} value={o.value}>{o.label}</option>
        ))}
      </select> */}
      {choices.map((choice, index) => (
        <button
          key={index}
          className={activeChoice === choice ? 'active' : ''}
          onClick={() => handleClick(choice)}
        >
          {choice}
        </button>
      ))}
    </div>
  );
};

export default ChoiceList;