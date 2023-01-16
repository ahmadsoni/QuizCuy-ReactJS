import {useEffect, useState, useCallback} from 'react';
import {createClient} from '@supabase/supabase-js';
import {useNavigate, Routes, Route} from 'react-router-dom';
import config from '../../config.json';
import Settings from './quiz/Settings';
import Question from './quiz/Question';
import FinalScreen from './quiz/FinalScreen';
import {Container, Typography} from '@mui/material';
import {Box} from '@mui/material';
import Navbar from './Navbar';
import {QueryClient, QueryClientProvider} from 'react-query';
import {ReactQueryDevtools} from 'react-query/devtools';

const queryClient = new QueryClient();
const {supabaseUrl, supabaseAnonKey} = config;
const supabase = createClient(supabaseUrl, supabaseAnonKey);
const {data, error} = await supabase.auth.getSession();

export default function Quiz(): any {
	if (data.session) {
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
							</Routes>
						</Box>
					</Container>
					<ReactQueryDevtools />
				</QueryClientProvider>
			</>
		);
	}

	if (!data.session) {
		window.location.href = '/';
	}
}
