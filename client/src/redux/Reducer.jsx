import {ADD_QUEUE, ADD_PLACE, REMOVE_PLACE, UPDATE_QUEUES} from "../constants/types";

const initialState = {
    queues: []
};

const reducer = function(state = initialState, action) {
    let newQueues;
    switch (action.type) {
        case ADD_QUEUE:
            return {
                queues: [...state.queues, action.payload]
            };
        case ADD_PLACE:
            newQueues = [...state.queues];
            newQueues.filter(queue => queue.id === action.payload.id)[0].students.push(action.payload.place);
            return {
                queues: newQueues
            };
        case REMOVE_PLACE:
            newQueues = [...state.queues];
            newQueues
                .filter(queue => queue.id === action.payload.queueId)[0]
                .students.splice(action.payload.placeId, 1);
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
