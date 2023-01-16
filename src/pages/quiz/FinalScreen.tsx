import {Button, Typography} from '@mui/material';
import {Box} from '@mui/material';
import {useSelector} from 'react-redux';
import {useDispatch} from 'react-redux';
import {useNavigate} from 'react-router-dom';
import {handleScoreChange, handleAmountChange} from '../../redux/actions';
export default function FinalScreen() {
	const {score}: any = useSelector(state => state);
	const {data}: any = useSelector(state => state);
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const handleBackToSettings = () => {
		dispatch(handleScoreChange(0));
		dispatch(handleAmountChange(10));
		navigate('/quiz');
	};

	return (
		<Box>
			<Typography variant='h3' fontWeight='bold' mb={3}>
				Your Score:  {100 / data * score}
			</Typography>
			<Button variant='contained' color='primary' onClick={handleBackToSettings}>
				Play Again
			</Button>
		</Box>
	);
}
