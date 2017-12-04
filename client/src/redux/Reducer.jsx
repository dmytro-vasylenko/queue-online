import {ADD_QUEUE, SET_PLACE, REMOVE_PLACE, UPDATE_QUEUES} from "../constants/types";

const initialState = {
    queues: []
};

const reducer = function(state = initialState, action) {
    switch (action.type) {
        case ADD_QUEUE:
            return {
                queues: [...state.queues, action.payload]
            };
        case SET_PLACE:
            return {
                queues: Object.assign({}, state.queues, {
                    [action.payload.id]: Object.assign({}, state.queues[action.payload.id], {
                        places: Object.assign({}, state.queues[action.payload.id].places, {
                            [action.payload.place]: action.payload.placeData
                        })
                    })
                })
            };
        case REMOVE_PLACE:
            let newQueues = state.queues;
            delete newQueues[action.payload.id].places[action.payload.place];
            return {
                queues: newQueues
            };
        case UPDATE_QUEUES:
            console.log("update");
            return {
                queues: [...state.queues]
            };
        default:
            return state;
    }
};

export default reducer;
