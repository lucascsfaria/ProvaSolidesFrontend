
import { styled } from '@material-ui/core/styles';

import {
    Grid,
    Input,
    InputLabel,
    MenuItem,
    FormControl,
    Select,
    Button} 
    from '@material-ui/core';

export const SCGrid = styled(Grid)({
    background: '#f9f9f9',
    padding: '1%'
});

export const SCFormControl = styled(FormControl)({
    margin: '5px',
    minWidth: '120',
    maxWidth: '300',
});

export const SCInput = styled(Input)({
});
export const SCInputLabel = styled(InputLabel)({
    fontSize: '16px',
    textAlign: 'center',
    margin: '10px 0'
});
export const SCMenuItem = styled(MenuItem)({
});
export const SCSelect = styled(Select)({
    width: '96%',
    margin: '10px 2%',

});

export const SCButtonSubmit = styled(Button)({
    background: '#502D73',
    border: 0,
    borderRadius: 3,
    color: 'white',
    height: 48,
    padding: '0 30px',
    margin: "10px 0",
    '&:hover': { background: '#6a468e'}
});

export const GridCenter = styled(Grid)({
    textAlign: 'center'
});


