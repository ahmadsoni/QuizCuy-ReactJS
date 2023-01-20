/* eslint-disable no-unsafe-optional-chaining */

/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import {useQuery, type UseQueryResult} from 'react-query';
import {Button, Typography, CircularProgress, Box, Paper, styled, Container, Stack, Grid, useMediaQuery} from '@mui/material';
import {useEffect, useMemo, useState, useCallback} from 'react';
import {decode} from 'html-entities';
import Cookies from 'js-cookie';
import {handleChangeVisited} from '../../redux/actions';
import {useDispatch} from 'react-redux';

const Breakpoint = {
	xs: 0,
	sm: 600,
	md: 960,
	lg: 1280,
	xl: 1920,
};

export default function Resume() {
	const dispatch = useDispatch();
	const [dataIndex, setDataIndex] = useState(0);
	const [options, setOptions] = useState<string[]>([]);
	const [Soal, setSoal] = useState('');
	const xs = useMediaQuery(`(max-width:${Breakpoint.xs}px)`);
	const sm = useMediaQuery(`(min-width:${Breakpoint.sm}px) and (max-width:${Breakpoint.sm - 1}px)`);
	const md = useMediaQuery(`(min-width:${Breakpoint.md}px) and (max-width:${Breakpoint.md - 1}px)`);
	const lg = useMediaQuery(`(min-width:${Breakpoint.lg}px) and (max-width:${Breakpoint.lg - 1}px)`);
	const xl = useMediaQuery(`(min-width:${Breakpoint.xl}px)`);

	const {data, isError, isLoading} = useQuery<{results: Array<{question: string; incorrect_answers: string[]; correct_answer: string}>}>('result', {
		refetchOnWindowFocus: false,
	});
	const temp = localStorage.getItem('result');

	const cekLocalStorage = useCallback(async () => {
		if (temp === null) {
			localStorage.setItem('result', JSON.stringify({data, isLoading, isError}));
		}
	}, [temp]);

	useEffect(() => {
		void cekLocalStorage();
	}, [cekLocalStorage]);
	const evaluasi = temp ? JSON.parse(temp) : null;
	// Data evaluasi data  fetch sebelum nya
	// Data jawaban
	const cookies = Cookies.get('answer');
	const cookiesAnswers = cookies ? JSON.parse(cookies) : null;
	useEffect(() => {
		let question;
		if (evaluasi === null) {
			question = data?.results[dataIndex];
		} else {
			question = evaluasi.data.results[dataIndex];
		}

		const answers: string[] = [...question.incorrect_answers];
		answers.splice(
			question.incorrect_answers.length,
			0,
			question.correct_answer,
		);
		setSoal(decode(question.question));
		setOptions(answers);
	}, [dataIndex]);
	const handleBackToSettings = () => {
		dispatch(handleChangeVisited(true));
		window.location.href = '/';
	};

	return (
		<Container>
			<Box>
				<Typography variant='h4' align='center' mt={4}>
					Hasil Evaluasi
				</Typography>
			</Box>
			<Box>
				<Typography variant='h4'> Question {dataIndex + 1}</Typography>
				<Typography mt={5}> {Soal}</Typography>
				{options.map((data, id) => (
					<Box mt={2} key={id} >
						<Button
							fullWidth
							variant='contained'
							style={{
								backgroundColor:
						cookiesAnswers[dataIndex].result[0].user_answer === data
							? 'green'
							: evaluasi?.data.results[dataIndex].correct_answer === data
								? 'red'
								: 'blue',
							}}
						>
							{decode(data)}
						</Button>
					</Box>
				))}
			</Box>
			<Stack direction='row' spacing={2} mt={6}>
				<Button variant='contained' color='success' onClick={() => {
					setDataIndex(dataIndex - 1);
				}} disabled={dataIndex === 0} fullWidth>
					Previous
				</Button>
				<Button variant='contained' color='success' onClick={() => {
					setDataIndex(dataIndex + 1);
				}} disabled={dataIndex === evaluasi?.data.results.length - 1} fullWidth>
					Next
				</Button>
			</Stack>
			<Box sx={{my: lg ? 30 : 5}}>
				<Button color='inherit' onClick={handleBackToSettings} fullWidth>
					Back to Settings
				</Button>
			</Box>
		</Container>
	);
}
