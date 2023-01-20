import {Button, Typography, CircularProgress, Box, Paper, styled, useMediaQuery} from '@mui/material';
import Grid from '@mui/material/Grid';
import {useDispatch, useSelector} from 'react-redux';
import {handleChangeVisited} from '../../redux/actions';
import {useNavigate} from 'react-router-dom';
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
const Breakpoint = {
	xs: 0,
	sm: 600,
	md: 960,
	lg: 1280,
	xl: 1920,
};
export default function FinalScreen() {
	const {changeVisited} = useSelector((state: QuestionProps) => state);
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const xs = useMediaQuery(`(max-width:${Breakpoint.xs}px)`);
	const sm = useMediaQuery(`(min-width:${Breakpoint.sm}px) and (max-width:${Breakpoint.sm - 1}px)`);
	const md = useMediaQuery(`(min-width:${Breakpoint.md}px) and (max-width:${Breakpoint.md - 1}px)`);
	const lg = useMediaQuery(`(min-width:${Breakpoint.lg}px) and (max-width:${Breakpoint.lg - 1}px)`);
	const xl = useMediaQuery(`(min-width:${Breakpoint.xl}px)`);
	const {
		amountOfQuestions,
		score,
		wrongAnswer,
	} = useSelector((state: QuestionProps) => state);

	const handleBackToSettings = () => {
		dispatch(handleChangeVisited(true));
		window.location.href = '/';
	};

	const handleToEvaluation = () => {
		navigate('/quiz/resume');
	};

	const totalScore: number = Math.round((score / amountOfQuestions) * 100);
	if (changeVisited) {
		return (
			<Box mt={20}>
				<CircularProgress />
			</Box>
		);
	}

	return (
		<Grid container spacing={2} mt={4}>
			<Grid item xs={12} sm={12}>
				<Typography variant={md ? 'subtitle2' : 'h4'} fontWeight='bold' mb={3}>
        Score: {totalScore ? totalScore : 0} / 100
				</Typography>
			</Grid>
			<Grid item xs={12} sm={12}>
				<StyledPaper sx={{my: 2, mx: 'auto', p: xs ? 1 : 2}}>
					<Grid container spacing={xs ? 0 : 2} sx={{my: 1, mx: 'auto', p: xs ? 1 : 2}}>
						<Typography variant='h6' fontWeight='bold' mb={1}>
            Total Questions: {amountOfQuestions}
						</Typography>
						<Typography variant='h6' fontWeight='bold' mb={1}>
            Total Jawaban Salah: {wrongAnswer}
						</Typography>
						<Typography variant='h6' fontWeight='bold' mb={1}>
            Total Jawaban Benar: {score}
						</Typography>
					</Grid>
				</StyledPaper>
			</Grid>
			<Grid item xs={12}>
				<Box mt={sm ? 3 : 5}>
					<Button variant='contained' color='primary' onClick={handleBackToSettings} fullWidth>
        Play Again
					</Button>
				</Box>
				<Box mt={sm ? 1 : 2}>
					<Button variant='contained' color='warning' onClick={handleToEvaluation} fullWidth>
        Evaluation
					</Button>
				</Box>
			</Grid>
		</Grid>
	);
}
