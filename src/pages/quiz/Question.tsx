/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import {Button, CircularProgress, Typography} from '@mui/material';
import {Box, Grid} from '@mui/material';
import {useSelector, useDispatch} from 'react-redux';
import {useEffect, useMemo, useState, useCallback} from 'react';
import {useNavigate} from 'react-router-dom';
import {handleScoreChange, handleDataChange, handleWrongAnswer} from '../../redux/actions';
import {decode} from 'html-entities';
import config from '../../../config.json';
import {useQuery, type UseQueryResult} from 'react-query';

type QuestionProps = {
	questionCategory: string;
	questionType: string;
	questionDifficulty: string;
	amountOfQuestions: number;
	score: number;
	wrongAnswer: number;
};
type UseAxiosProps = {
	response: {
		results: Array<{
			category: string;
			type: string;
			difficulty: string;
			question: string;
			correct_answer: string;
			incorrect_answers: string[];
		}>;
	};
	loading: boolean;
};

const getRandomInt = (max: number) => Math.floor(Math.random() * max);

export default function Question() {
	const [questionIndex, setQuestionIndex] = useState(0);
	const [options, setOptions] = useState<string[]>([]);
	const [totalQuestions, setTotalQuestions] = useState(0);
	const [Soal, setSoal] = useState('');

	const {
		questionCategory,
		questionType,
		questionDifficulty,
		amountOfQuestions,
		score,
		wrongAnswer,
	} = useSelector((state: QuestionProps) => state);
	let apiUrl = `api.php?amount=${amountOfQuestions}`;
	const navigate = useNavigate();
	const dispatch = useDispatch();
	if (questionCategory) {
		apiUrl = apiUrl.concat(`&category=${questionCategory}`);
	}

	if (questionDifficulty) {
		apiUrl = apiUrl.concat(`&difficulty=${questionDifficulty}`);
	}

	if (questionType) {
		apiUrl = apiUrl.concat(`&type=${questionType}`);
	}

	console.log('api link  = ', apiUrl);
	const useReactQuery = async () => {
		const response = await fetch(config.url + apiUrl);
		const data = response.json();
		return data;
	};

	const {data, isError, isLoading} = useQuery(
		'result',
		useReactQuery,
	);
	// Get question
	const handleAnswer = useMemo(() => async () => {
		console.log(data);
		setTotalQuestions(await data?.results.length);
		if (data?.results.length) {
			const question = await data.results[questionIndex];
			const answers: string[] = [...question.incorrect_answers];
			answers.splice(
				getRandomInt(question.incorrect_answers.length),
				0,
				question.correct_answer,
			);
			setSoal(decode(data?.results[questionIndex].question));
			setOptions([...answers]);
		}
	}, [!isLoading, questionIndex]);
	useEffect(() => {
		// eslint-disable-next-line @typescript-eslint/no-floating-promises
		handleAnswer();
	}, [handleAnswer]);
	// Handle answer
	const handleClickAnswere = (e: any) => {
		console.log('soal', data.results[questionIndex].correct_answer);
		console.log('jawaban', e.target.textContent);
		const question = data.results[questionIndex];
		if (e.target.textContent === question.correct_answer) {
			console.log('masuk score');
			dispatch(handleScoreChange(score + 1));
		}

		if (e.target.textContent !== question.correct_answer) {
			console.log('masuk wrong');
			dispatch(handleWrongAnswer(wrongAnswer + 1));
		}

		if (questionIndex + 1 < data.results.length) {
			setQuestionIndex(questionIndex + 1);
		} else {
			console.log('lah gak masuk score');
			dispatch(handleDataChange(data?.results.length));
			navigate('/quiz/score');
		}
	};

	const TimerQuiz = () => {
		const [time, setTime] = useState(10);
		useEffect(() => {
			const timer = setTimeout(() => {
				setTime(time - 1);
			}, 1000);
			if (time === 0) {
				dispatch(handleWrongAnswer(wrongAnswer + 1));
				if (questionIndex + 1 < data.results.length) {
					setQuestionIndex(questionIndex + 1);
				} else {
					navigate('/quiz/score');
				}

				return () => {
					clearTimeout(timer);
				};
			}

			return () => {
				clearTimeout(timer);
			};
		}, [time]);
		return (
			<Grid
				container
				direction='column-reverse'
				justifyContent='end'
				alignItems='end'
				mb={4}
			>
				<Button variant='outlined' color='error' sx={{display: 'flex', justifyContent: 'flex-end', flexGrow: 1}}>
					<Typography variant='h5' color={'error'} >Time: {time}</Typography>
				</Button>

			</Grid>
		);
	};

	if (isLoading && !data) {
		return (
			<Box mt={20}>
				<Typography variant='h4'> Question {questionIndex}</Typography>
				<CircularProgress />
			</Box>
		);
	}

	if (isError) {
		return (
			<Box mt={20}>
				<Typography variant='h4'> Question {questionIndex + 1}</Typography>
				<Typography variant='h4'> Error: {isError}</Typography>
			</Box>
		);
	}

	return (
		<>
			<TimerQuiz />
			<Box>
				<Typography variant='h4'> Question {questionIndex + 1} / {totalQuestions}</Typography>
				<Typography mt={5}> {Soal}</Typography>
				{options.map((data, id) => (
					<Box mt={2} key={id} >
						<Button onClick={handleClickAnswere} fullWidth variant='contained'>
							{decode(data)}
						</Button>
					</Box>
				))}
			</Box>
		</>
	);
}
