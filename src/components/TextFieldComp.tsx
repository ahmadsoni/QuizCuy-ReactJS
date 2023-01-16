import {Box} from '@mui/material';
import {FormControl, TextField} from '@mui/material';
import {useDispatch} from 'react-redux';
import {handleAmountChange} from '../redux/actions';
import {useEffect} from 'react';
export default function TextFieldComp() {
	const dispatch = useDispatch();
	const handleChange = (e: any) => {
		dispatch(handleAmountChange(e.target.value));
	};

	return (
		<Box mt={3} width='100%'>
			<FormControl fullWidth size='small'>
				<TextField
					onChange={handleChange}
					variant='outlined'
					label='Amount Of Questions'
					type='number'
					size='small'
				/>
			</FormControl>
		</Box>
	);
}
