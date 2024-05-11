import React from 'react';
import styled from 'styled-components';

// Styled component for the container of options
const OptionsContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 10px;
`;

// Styled component for each option box
const OptionBox = styled.div`
  padding: 10px 20px;
  margin: 5px;
  background-color: ${(props) => (props.isSelected ? '#4CAF50' : '#eee')};
  color: ${(props) => (props.isSelected ? 'white' : 'black')};
  border: 2px solid ${(props) => (props.isSelected ? '#4CAF50' : '#ddd')};
  border-radius: 5px;
  cursor: pointer;
  transition: all 0.3s;

  &:hover {
    background-color: ${(props) => (props.isSelected ? '#388E3C' : '#ddd')};
  }
`;

const DotSelector = ({ items, selectedValue, setSelectedValue }) => {
  return (
    <OptionsContainer>
      {items.map((item, index) => (
        <OptionBox
          key={index}
          isSelected={selectedValue === item}
          onClick={() => setSelectedValue(item)}
        >
          {item}
        </OptionBox>
      ))}
    </OptionsContainer>
  );
};

export default DotSelector;
