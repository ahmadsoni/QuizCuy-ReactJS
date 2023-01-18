import {
	changeCategory,
	changeType,
	changeDifficulty,
	changeAmount,
	changeScore,
	wrongAnswer,
	changeVisited,
} from './actionTypes';

export const handleCategoryChange = (payload: string) => ({
	type: changeCategory,
	payload,
});
export const handleDifficultyChange = (payload: string) => ({
	type: changeDifficulty,
	payload,
});
export const handleTypeChange = (payload: string) => ({
	type: changeType,
	payload,
});
export const handleAmountChange = (payload: number) => ({
	type: changeAmount,
	payload,
});
export const handleScoreChange = (payload: number) => ({
	type: changeScore,
	payload,
});

export const handleWrongAnswer = (payload: number) => ({
	type: wrongAnswer,
	payload,
});

export const handleChangeVisited = (payload: boolean) => ({
	type: changeVisited,
	payload,
});
