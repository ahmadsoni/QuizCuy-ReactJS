/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/default-param-last */
import {changeType, changeCategory, changeDifficulty, changeAmount, changeScore, changeData, wrongAnswer} from './actionTypes';
type InitalStateProps = {
	questionCategory: string;
	questionType: string;
	questionDifficulty: string;
	amountOfQuestions: number;
	score: number;
	data: number;
	wrongAnswer: number;
};
type ActionProps = {
	type: Record<string, unknown>;
	payload: Record<string, unknown>;
};

const initialState: InitalStateProps = {
	questionCategory: '',
	questionType: '',
	questionDifficulty: '',
	amountOfQuestions: 10,
	score: 0,
	data: 0,
	wrongAnswer: 0,
};

const reducer = (state = initialState, action: any) => {
	switch (action.type) {
		case changeCategory:
			return {
				...state,
				questionCategory: action.payload,
			};
		case changeDifficulty:
			return {
				...state,
				questionDifficulty: action.payload,
			};
		case changeType:
			return {
				...state,
				questionType: action.payload,
			};
		case changeAmount:
			return {
				...state,
				amountOfQuestions: action.payload,
			};
		case changeScore:
			return {
				...state,
				score: action.payload,
			};
		case changeData:
			return {
				...state,
				data: action.payload,
			};
		case wrongAnswer:
			return {
				...state,
				wrongAnswer: action.payload,
			};
		default:
			return state;
	}
};

export default reducer;
