const SET_QUEUE = "SET_QUEUE";
const SET_PLACE = "SET_PLACE";

const initialState = {
	queues: {}
};

const reducer = function(state = initialState, action) {
	switch(action.type) {
		case SET_QUEUE:
			var places = {};
			action.payload.places.forEach(item => {
				places[item.place] = item;
			});
			action.payload.places = places;
			state.queues[action.payload.id] = action.payload;
			return state;
		case SET_PLACE:
			var newQueues = state.queues;
			newQueues[action.payload.id].places[action.payload.place] = action.payload.placeData;
			return {
				queues: newQueues
			};
	}
}

export default reducer;