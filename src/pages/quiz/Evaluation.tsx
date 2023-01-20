/* eslint-disable no-unsafe-optional-chaining */

/* eslint-disable @typescript-eslint/no-unsafe-call */

/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import {useQuery, type UseQueryResult} from 'react-query';
import {Button, Typography, CircularProgress, Box, Paper, styled, Container, Stack} from '@mui/material';
import {useEffect, useMemo, useState, useCallback} from 'react';
import {decode} from 'html-entities';
import Cookies from 'js-cookie';

export default function Evaluation() {
	// Const [dataIndex, setDataIndex] = useState(0);
	const [options, setOptions] = useState<string[]>([]);

	// Tangkap data dari use-query
	const {data, isError, isLoading} = useQuery(
		'result',
		{
			refetchOnWindowFocus: false,
		},
	);
	const temp = localStorage.getItem('result');
	useEffect(() => {
		if (temp === null) {
			localStorage.setItem('result', JSON.stringify({data, isLoading, isError}));
		}
	}, [temp]);
	const cookies = Cookies.get('answer');
	const evaluasi = temp ? JSON.parse(temp) : null;
	// Tangkap data jawaban
	const cookiesAnswers = cookies ? JSON.parse(cookies) : null;
	// Tangkap data question incorrect dan correct
	if (evaluasi?.data.results) {
		for (const question of evaluasi?.data.results) {
			const answers: string[] = [...question.incorrect_answers];
			answers.splice(
				question.incorrect_answers.length,
				0,
				question.correct_answer,
			);
			const storedAnswers = JSON.parse(localStorage.getItem('options') ?? '[]');
			let isExist = false;
			storedAnswers.forEach((storedAnswer: any) => {
				if (storedAnswer.question === question.question) {
					isExist = true;
				}
			});
			if (!isExist) {
				storedAnswers.push({
					question: question.question,
					answers,
				});
				localStorage.setItem('options', JSON.stringify(storedAnswers));
			}
		}
	}

	// Tangkap data question incorrect dan correct
	const storedAnswers = JSON.parse(localStorage.getItem('options') ?? '[]');

	// Console.log('eval', evaluasi?.data.results[1].correct_answer);
	// // Console.log('yok', cookiesAnswers[1].result[0].user_answer);
	// console.log('yok', cookiesAnswers[1].result[0].user_answer);
	console.log('yok 1', storedAnswers[0]);
	console.log('yok 2', storedAnswers[1]);
	// Console.log('bo 1', cookiesAnswers[0]);
	// console.log('bo 2', cookiesAnswers[1]);
	const lopp = ['hari'];
	return (
		<Container>
			{evaluasi?.data.results.map((data: {question: string | undefined | undefined; correct_answer: string | undefined | undefined}, index: number) => (
				<Box key={index} mt={4}>
					<Typography variant='h4'> Question {index + 1}</Typography>
					<Typography variant='subtitle1' mt={2}>{decode(data.question)}</Typography>
					{lopp.map((data: string, idx: number) => (
						<Box key={idx}>
							{storedAnswers[idx].answers.map((option: string, id: number) => (
								<Box mt={2} key={id} >
									<Button fullWidth variant='contained' color={cookiesAnswers[idx].result[0].user_answer === evaluasi?.data.results[idx].correct_answer ? (
										'success'
									) : (
										'error'
									)}>
										{decode(option)}
									</Button>
								</Box>
							))}
						</Box>
					))}
				</Box>
			))}
			{/* <Stack direction='row' spacing={2} mt={4}>
				<Button variant='contained' color='primary' onClick={() => setDataIndex(dataIndex - 1)} disabled={dataIndex === 0} fullWidth>
					Previous
				</Button>
				<Button variant='contained' color='primary' onClick={() => setDataIndex(dataIndex + 1)} disabled={dataIndex === data?.results.length - 1} fullWidth>
					Next
				</Button>
			</Stack> */}
		</Container>
	);
}
