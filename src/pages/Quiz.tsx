/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-redundant-type-constituents */
import {useEffect, useState, useCallback} from 'react';
import {createClient} from '@supabase/supabase-js';
import {useNavigate, Routes, Route, Navigate} from 'react-router-dom';
import config from '../../config.json';
import Settings from './quiz/Settings';
import Question from './quiz/Question';
import FinalScreen from './quiz/FinalScreen';
import Evaluation from './quiz/Evaluation';
import {Container, Typography} from '@mui/material';
import {Box} from '@mui/material';
import Navbar from './Navbar';
import {QueryClient, QueryClientProvider} from 'react-query';
import {ReactQueryDevtools} from 'react-query/devtools';
import Resume from './quiz/Resume';

const queryClient = new QueryClient();
const {supabaseUrl, supabaseAnonKey} = config;
const supabase = createClient(supabaseUrl, supabaseAnonKey);
// Const {data, error} = await supabase.auth.getSession();const [session, setSession] = useState<{session: any; error: any}>({session: undefined, error: undefined});

export default function Quiz(): any {
	const navigate = useNavigate();
	const [session, setSession] = useState<any | undefined>(undefined);
	useEffect(() => {
		void supabase.auth.getSession().then(({data: {session}}) => {
			setSession(session);
		});

		supabase.auth.onAuthStateChange((_event, session) => {
			setSession(session);
		});
	}, []);
	if (session) {
		return (
			<>
				<QueryClientProvider client={queryClient}>
					<Navbar />
					<Container maxWidth='sm'>
						<Box textAlign='center' mt={5}>
							<Routes>
								<Route path='/' element={<Settings />}/>
								<Route path='/question' element={<Question />} />
								<Route path='/score' element={<FinalScreen />} />
								<Route path='/evaluation' element={<Evaluation />} />
								<Route path='/resume' element={<Resume />} />
							</Routes>
						</Box>
					</Container>
					<ReactQueryDevtools />
				</QueryClientProvider>
			</>
		);
	}

	if (!session) {
		navigate('/');
	}
}
