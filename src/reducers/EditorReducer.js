import { FETCH_DATA, START_EDITING, STOP_EDITING } from "../actions/type";

const initialState = {
    item : {},
    status : true,
    lock : false,
}

export default function(state = initialState, action){
    console.log("reducer");
    switch(action.type){
        case FETCH_DATA:
            console.log("fetching data");
            return {
                ...state,
                item : action.payload
            }
        default:
            console.log("Not fetching data");
            return state;
    }
}

