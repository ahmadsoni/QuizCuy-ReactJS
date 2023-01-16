import {FormControl, InputLabel, MenuItem, Select} from '@mui/material';
import {Box} from '@mui/material';
import {useState} from 'react';
import {useDispatch} from 'react-redux';
import {handleCategoryChange, handleDifficultyChange, handleTypeChange} from '../redux/actions';

type SelectFieldProps = {
	label?: string;
	options?: Array<{id: string; name: string}>;
};

export default function SelectField(props: SelectFieldProps) {
	const dispatch = useDispatch();
	const {label, options} = props;
	const [value, setValue] = useState('');
	const handleChange = (e: any) => {
		setValue(e.target.value);
		switch (label) {
			case 'Category':
				dispatch(handleCategoryChange(e.target.value));
				break;
			case 'Difficulty':
				dispatch(handleDifficultyChange(e.target.value));
				break;
			case 'Type':
				dispatch(handleTypeChange(e.target.value));
				break;
			default:
		}
	};

	return (
		<Box mt={3} width='100%'>
			<FormControl fullWidth size='small'>
				<InputLabel>{label}</InputLabel>
				<Select value={value} label={label} onChange={handleChange}>
					{options?.map(({id, name}) => (
						<MenuItem key={id} value={id}>
							{name}
						</MenuItem>
					))}
				</Select>
			</FormControl>

		</Box>
	);
}
