/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import {Button, CircularProgress, Typography} from '@mui/material';
import {Box} from '@mui/material';
import {useSelector, useDispatch} from 'react-redux';
import {useEffect, useMemo, useState} from 'react';
import {useNavigate} from 'react-router-dom';
import {handleScoreChange, handleDataChange} from '../../redux/actions';
import {decode} from 'html-entities';
import config from '../../../config.json';
import {useQuery, type UseQueryResult} from 'react-query';

type QuestionProps = {
	questionCategory: string;
	questionType: string;
	questionDifficulty: string;
	amountOfQuestions: number;
	score: number;
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

	const {
		questionCategory,
		questionType,
		questionDifficulty,
		amountOfQuestions,
		score,
	} = useSelector((state: QuestionProps) => state);
	let apiUrl = `api.php?amount=${amountOfQuestions}`;
	const navigate = useNavigate();
	const dispatch = useDispatch();
	if (questionCategory) {
		apiUrl = apiUrl.concat(`&category=${questionCategory}`);
	}

	if (questionType) {
		apiUrl = apiUrl.concat(`&type=${questionType}`);
	}

	if (questionDifficulty) {
		apiUrl = apiUrl.concat(`&difficulty=${questionDifficulty}`);
	}

	const useReactQuery = async () => {
		const response = await fetch(config.url + apiUrl);
		return response.json();
	};

	const {data, isError, isLoading} = useQuery(
		'result',
		useReactQuery,
	);
	const handleClickAnswere = (e: any) => {
		const question = data.results[questionIndex];
		if (e.target.textContent === question.correct_answer) {
			dispatch(handleScoreChange(score + 1));
		}

		if (questionIndex + 1 < data.results.length) {
			setQuestionIndex(questionIndex + 1);
		} else {
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
		return <Typography variant='h4' mb={4} color={'error'} sx={{display: 'flex', justifyContent: 'flex-end', flexGrow: 0}}>Time: {time}</Typography>;
	};

	// Console.log(data);
	const handleAnswer = useMemo(() => () => {
		if (data?.results.length) {
			const question = data.results[questionIndex];
			const answers: string[] = [...question.incorrect_answers];
			answers.splice(
				getRandomInt(question.incorrect_answers.length),
				0,
				question.correct_answer,
			);
			setOptions([...answers]);
			// Console.log('render ulang');
		}
	}, [!isLoading, questionIndex]);
	useEffect(() => {
		handleAnswer();
	}, [handleAnswer]);
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
				<Typography variant='h4'> Question {questionIndex + 1}</Typography>
				<Typography mt={5}> {decode(data?.results[questionIndex].question)}</Typography>
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
