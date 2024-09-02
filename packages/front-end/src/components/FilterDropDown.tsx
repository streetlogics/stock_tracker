import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from '@mui/material';
import React from 'react';

interface FilterProps {
  fieldName: string;
  dropDownItems: any;
  selectedFilterValue: string;
  handleChange: (filters: any) => void;
}

export const FilterDropDown: React.FC<FilterProps> = ({ fieldName, handleChange, dropDownItems, selectedFilterValue }) => {
  const filterBoxStyles = { mb: 2, ml: 0.1, mr: 0.1 };
  return (
    <FormControl 
      variant="filled" 
      color="secondary"
      sx={filterBoxStyles} 
      size="small">
      <InputLabel>{fieldName}</InputLabel>
      <Select name={fieldName.toLowerCase()} value={selectedFilterValue} onChange={e => handleChange(e)}>
        <MenuItem value=""><em>None</em></MenuItem>
        {dropDownItems.map((menuItem, index) => (
          <MenuItem key={index} value={menuItem}>{menuItem}</MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};
