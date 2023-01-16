/* eslint-disable @typescript-eslint/no-redundant-type-constituents */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import AppBar from '@mui/material/AppBar';
import {Box} from '@mui/material';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import AdbIcon from '@mui/icons-material/Adb';
import config from '../../config.json';
import {createClient} from '@supabase/supabase-js';
import {useEffect, useState, useCallback} from 'react';

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
function Navbar() {
	const [session, setSession] = useState<any | undefined>(undefined);
	useEffect(() => {
		void supabase.auth.getSession().then(({data: {session}}) => {
			setSession(session);
		});

		supabase.auth.onAuthStateChange((_event, session) => {
			setSession(session);
		});
	}, []);
	const handleLogout = async () => {
		await supabase.auth.signOut();
		window.location.href = '/';
	};

	return (
		<AppBar position='static'>
			<Container maxWidth='xl'>
				<Toolbar disableGutters>
					<AdbIcon sx={{display: {xs: 'none', md: 'flex'}, mr: 1}} />
					<AdbIcon sx={{display: {xs: 'flex', md: 'none'}, mr: 1}} />
					<Box sx={{flexGrow: 1, display: {xs: 'none', md: 'flex'}}}>
						<Typography
							variant='h6'
							noWrap
							component='a'
							href='/quiz/'
							sx={{
								mr: 2,
								display: {xs: 'none', md: 'flex'},
								fontFamily: 'monospace',
								fontWeight: 700,
								letterSpacing: '.3rem',
								color: 'inherit',
								textDecoration: 'none',
							}}
						>
							Hello, {session?.user?.user_metadata.name ?? 'User'}
						</Typography>
					</Box>

					<Box sx={{flexGrow: 0}}>
						<Button
							color='secondary'
							onClick={handleLogout}
							sx={{my: 2, color: 'white', display: 'block'}}
						>
								Logout
						</Button>
					</Box>
				</Toolbar>
			</Container>
		</AppBar>
	);
}

export default Navbar;
