import React from 'react';
import {useQuery, type UseQueryResult} from 'react-query';
export default function Evaluation() {
	const {data, isError, isLoading} = useQuery(
		'result',
	);
	console.log(data);
	return (
		<div>
		</div>
	);
}
