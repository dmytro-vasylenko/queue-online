import * as types from "../constants/types";

const initialState = {
	queues: {}
};

const reducer = function(state = initialState, action) {
	switch(action.type) {
		case types.SET_QUEUE:
			let places = {};
			action.payload.places.forEach(item => {
				places[item.place] = item;
			});
			action.payload.places = places;
			return {
				queues: Object.assign({}, state.queues, {
					[action.payload.id]: action.payload
				})
			};
		case types.SET_PLACE:
			return {
				queues: Object.assign({}, state.queues, {
					[action.payload.id]: Object.assign({}, state.queues[action.payload.id], {
						[action.payload.place]: action.payload.placeData
					})
				})
			};
		case types.REMOVE_PLACE:
			let newQueues = state.queues;
			delete newQueues[action.payload.id].places[action.payload.place];
			return {
				queues: newQueues
			};
		default:
			return state;
	}
}

export default reducer;