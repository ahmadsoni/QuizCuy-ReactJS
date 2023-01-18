
import {Button, Typography, CircularProgress, Box, Paper, styled} from '@mui/material';
import Grid from '@mui/material/Grid';
import {useDispatch, useSelector} from 'react-redux';
import {useNavigate} from 'react-router-dom';
import {handleScoreChange, handleAmountChange, handleWrongAnswer, handleChangeVisited} from '../../redux/actions';
import {useState, useEffect} from 'react';

type QuestionProps = {
	questionCategory: string;
	questionType: string;
	questionDifficulty: string;
	amountOfQuestions: number;
	score: number;
	wrongAnswer: number;
	changeVisited: boolean;
};
const StyledPaper = styled(Paper)(({theme}) => ({
	backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
	...theme.typography.body2,
	padding: theme.spacing(2),
	maxWidth: 400,
	color: theme.palette.text.primary,
}));
export default function FinalScreen() {
	const {amountOfQuestions, score, wrongAnswer} = useSelector((state: QuestionProps) => state);
	const [totalScore, setTotalScore] = useState(0);
	const [returnToSettings, setReturnToSettings] = useState(false);
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const handleBackToSettings = () => {
		setReturnToSettings(true);
		navigate('/quiz');
		dispatch(handleChangeVisited(true));
	};

	// Console.log(data);
	// console.log(score);
	useEffect(() => {
		setTotalScore(Math.round((score / amountOfQuestions) * 100));
	}, [score]);
	if (returnToSettings) {
		return (
			<Box mt={20}>
				<CircularProgress />
			</Box>
		);
	}

	return (
		<Box sx={{flexGrow: 1, overflow: 'hidden', px: 3}} mt={20}>
			<Typography variant='h3' fontWeight='bold' mb={3}>
				Score:  {totalScore ? totalScore : 0} / 100
			</Typography>
			<StyledPaper
				sx={{
					my: 1,
					mx: 'auto',
					p: 2,
				}}
			>
				<Grid container spacing={2} sx={{
					my: 1,
					mx: 'auto',
					p: 2,
				}}>
					<Typography variant='h5' fontWeight='bold' mb={1}>
				Total Questions: {amountOfQuestions}
					</Typography>
					<Typography variant='h5' fontWeight='bold' mb={1}>
				Total Jawaban Salah: {wrongAnswer}
					</Typography>
					<Typography variant='h5' fontWeight='bold' mb={1}>
				Total Jawaban Benar: {score}
					</Typography>
				</Grid>
			</StyledPaper>
			<Box mt={5} >
				<Button variant='contained' color='primary' onClick={handleBackToSettings}>
				Play Again
				</Button>
			</Box>
		</Box>
	);
}
