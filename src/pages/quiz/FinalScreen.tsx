
import {Button, Typography, CircularProgress, Box, Paper, styled} from '@mui/material';
import Grid from '@mui/material/Grid';
import {useDispatch, useSelector} from 'react-redux';
import Cookies from 'js-cookie';
import {handleChangeVisited} from '../../redux/actions';
type CookiesScore = {
	amountOfQuestions: number;
	wrongAnswer: number;
	score: number;
	totalScore: number;
};
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
	const {changeVisited} = useSelector((state: QuestionProps) => state);
	const dispatch = useDispatch();
	const {
		amountOfQuestions,
		score,
		wrongAnswer,
	} = useSelector((state: QuestionProps) => state);
	const handleBackToSettings = () => {
		dispatch(handleChangeVisited(true));
		window.location.href = '/';
	};

	const totalScore: number = Math.round((score / amountOfQuestions) * 100);
	// Const ScoreFinal: CookiesScore = {
	// 	amountOfQuestions,
	// 	wrongAnswer,
	// 	score,
	// 	totalScore,
	// };
	// Cookies.set('score', JSON.stringify(ScoreFinal));
	// const dataLoaded = JSON.parse(Cookies.get('score') ?? '{}');
	if (changeVisited) {
		return (
			<Box mt={20}>
				<CircularProgress />
			</Box>
		);
	}

	return (
		<Box sx={{flexGrow: 1, overflow: 'hidden', px: 3}} mt={20}>
			<Typography variant='h4' fontWeight='bold' mb={3}>
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
