import {ADD_QUEUE, ADD_PLACE, REMOVE_PLACE, UPDATE_QUEUES} from "../constants/types";

const initialState = {
    queues: {}
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_QUEUE:
            return {
                queues: {
                    ...state.queues,
                    [action.payload.id]: action.payload
                }
            };
        case ADD_PLACE:
            console.log(action.payload);
            return {
                queues: {
                    ...state.queues,
                    [action.payload.id]: {
                        ...state.queues[action.payload.id],
                        students: [...state.queues[action.payload.id].students, action.payload.place]
                    }
                }
            };
        case REMOVE_PLACE:
            console.log(action.payload);
            return {
                queues: {
                    ...state.queues,
                    [action.payload.queueId]: {
                        ...state.queues[action.payload.queueId],
                        students: state.queues[action.payload.queueId].students.filter(
                            (item, index) => index !== action.payload.placeId
                        )
                    }
                }
            };
        case UPDATE_QUEUES:
            return {
                queues: {...state.queues}
            };
        default:
            return state;
    }
};

export default reducer;
