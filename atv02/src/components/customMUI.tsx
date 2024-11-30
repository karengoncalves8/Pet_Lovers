import { styled } from '@mui/material/styles';

import Button, { ButtonProps } from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import { GridActionsCellItem } from '@mui/x-data-grid/components';


export const CardPaper = styled(Paper)(() => ({
    padding: 30,
    textAlign: 'center',
    borderRadius: 8,
}));
  
export const BlueButton = styled(Button)<ButtonProps>(() => ({
    color: 'white',
    backgroundColor: '#2578A1',
    '&:hover': {
        backgroundColor:'#7ABFE2',
    },
}));

export const LightBlueButton = styled(Button)<ButtonProps>(() => ({
    color: '#2578A1',
    backgroundColor: '#C1E4F5',
    borderRadius: '8px',
    '&:hover': {
        backgroundColor:'#2578A1',
        color: 'white'
    },
}));
