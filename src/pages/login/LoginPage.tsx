/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-redundant-type-constituents */
/* eslint-disable @typescript-eslint/no-floating-promises */
import {createClient} from '@supabase/supabase-js';
import {Auth, ThemeSupa} from '@supabase/auth-ui-react';
import {useNavigate} from 'react-router-dom';
import config from '../../../config.json';
import {useEffect, useCallback, useState} from 'react';
const {supabaseUrl, supabaseAnonKey} = config;
const supabase = createClient(supabaseUrl, supabaseAnonKey);
// Const {data, error} = await supabase.auth.getSession();
type Session = {
	user: {
		user_metadata: {
			name: string;
		};
	};
};
export default function Login() {
	const navigate = useNavigate();
	const [session, setSession] = useState<any | undefined>(undefined);
	useEffect(() => {
		supabase.auth.getSession().then(({data: {session}}) => {
			setSession(session);
		});

		supabase.auth.onAuthStateChange((_event, session) => {
			setSession(session);
		});
	}, []);
	useEffect(() => {
		if (session) {
			navigate('/quiz/');
		} else if (!session) {
			navigate('/');
		}
	}, [session]);

	return (
		// Full content
		<div className='bg-black h-screen w-screen'>
			<div className='flex min-h-full items-center justify-center py-12 px-4 sm:px-6 lg:px-8'>
				<Auth
					supabaseClient={supabase}
					appearance={{theme: ThemeSupa}}
					theme='dark'
					providers={['google']}
				/>
			</div>
		</div>
	);
}
