import React from 'react';
import InputMask from 'react-input-mask';
import { TextField } from '@mui/material';

interface MaskProps{
    mask: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    label: string;
    name: string;
    required?: boolean
}

export const MaskedTextField: React.FC<MaskProps> = ({ mask, value, onChange, label, name, required }) => {
  return (
    <InputMask mask={mask} value={value} onChange={onChange}>
      {(inputProps) => (
        <TextField
          {...inputProps}
          variant="outlined"
          fullWidth
          label={label}
          name={name}
          margin="normal"
          required={required}
        />
      )}
    </InputMask>
  );
};

