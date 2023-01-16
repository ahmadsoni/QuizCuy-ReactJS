
import {useNavigate} from 'react-router-dom';
import {Button, Typography, CircularProgress} from '@mui/material';
import SelectField from '../../components/SelectField';
import {Box} from '@mui/material';
import TextFieldComp from '../../components/TextFieldComp';
import {useQuery, type UseQueryResult} from 'react-query';
import config from '../../../config.json';

type TriviaProps = {
	id: string;
	name: string;
};
type DataProps = {
	trivia_categories: TriviaProps[];
	isError: boolean;
	isLoading: boolean;
};

export default function Settings() {
	const navigate = useNavigate();

	const {data, isError, isLoading}: UseQueryResult<DataProps, Error> = useQuery<DataProps, Error>(
		'categories',
		async () => fetch(config.url + 'api_category.php').then(async res => res.json()),
	);
	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		navigate('/quiz/question');
	};

	if (isLoading) {
		return (
			<Typography variant='h2' fontWeight='bold'>
			QUIZ CUY
				<Box mt={20} >
					<CircularProgress />
				</Box>
			</Typography>
		);
	}

	if (isError) {
		<Typography variant='h6' fontWeight='bold' color='red' mt={20}>
			Something went wrong
		</Typography>;
	}

	const difficultyOptions = [
		{id: 'easy', name: 'Easy'},
		{id: 'medium', name: 'Medium'},
		{id: 'hard', name: 'Hard'},
	];
	const typeOptions = [
		{id: 'multiple', name: 'Multiple Choice'},
		{id: 'boolean', name: 'True / False'},
	];
	return (
		<Typography variant='h2' fontWeight='bold'>
			QUIZ CUY
			<form onSubmit={handleSubmit}>
				<SelectField options={data?.trivia_categories ?? []} label='Category' />
				<SelectField options={difficultyOptions} label='Difficulty' />
				<SelectField options={typeOptions} label='Type' />
				<TextFieldComp />
				<Box>
					<Button fullWidth variant='contained' type='submit'>
						Get Start
					</Button>
				</Box>
			</form>
		</Typography>
	);
}
