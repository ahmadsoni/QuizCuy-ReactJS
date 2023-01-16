import {createClient} from '@supabase/supabase-js';
import {Auth, ThemeSupa} from '@supabase/auth-ui-react';
import {useNavigate} from 'react-router-dom';
import config from '../../../config.json';
import {useEffect, useCallback, useState} from 'react';
const {supabaseUrl, supabaseAnonKey} = config;
const supabase = createClient(supabaseUrl, supabaseAnonKey);
const {data, error} = await supabase.auth.getSession();
export default function Login() {
	const navigate = useNavigate();
	useEffect(() => {
		if (data.session) {
			navigate('/quiz/');
		} else if (!data.session) {
			navigate('/');
		}
	}, [data]);

	supabase.auth.onAuthStateChange(async event => {
		if (event !== 'SIGNED_OUT' || data.session !== null) {
			window.location.href = '/quiz/';
		} else if (event === 'SIGNED_OUT' && data.session === null) {
			window.location.href = '/';
		}
	});

	return (
		// Full content
		<div className='bg-black h-screen w-screen'>
			<div className='flex min-h-full items-center justify-center py-12 px-4 sm:px-6 lg:px-8'>
				<Auth
					supabaseClient={supabase}
					appearance={{
						theme: ThemeSupa}}
					theme='dark'
					providers={['google']}
				/>
			</div>
		</div>
	);
}
