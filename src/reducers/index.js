import utils from './functions';
const initialValue = {
		"mo": [
			{
				"bt": 240,
				"et": 779
			}
		],
		"tu": [
		],
		"we": [
		],
		"th": [
			{
				"bt": 240,
				"et": 779
			},
			{
				"bt": 1140,
				"et": 1319
			}
		],
		"fr": [
			{
				"bt": 660,
				"et": 1019
			}
		],
		"sa": [
			{
				"bt": 0,
				"et": 1439
			}
		],
		"su": []
	}

const hoursInterval = ( state=initialValue, action ) => {
	switch( action.type ) {
		case 'TOGGLE HOURS': return ({ ...state, [action.day]: utils.selectHours([...state[action.day]], action.hours) });
		case 'TOGGLE DAY': return ({ ...state, [action.day]: ((state[action.day].length > 0) && (state[action.day][0].bt === 0) &&  (state[action.day][0].et === 1439)) ? [] : [{'bt': 0, 'et': 1439}]});
		case 'MOUSE MOVE': return (utils.chooseInterval({...state}, action.day, action.hours, action.startDay, action.startHours));
		case 'MOUSE UP': utils.mouseUp(); return (state);
		case 'CLEAR ALL': return {"mo":[],"tu":[],"we":[],"th":[],"fr":[],"sa":[],"su":[]};
		default: return state;
	}
};

export default hoursInterval

