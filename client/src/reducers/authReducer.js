import { FETCH_USER }  from '../actions/types';

export default function(state = null, action){

    switch (action.type){
        case FETCH_USER:
            return action.payload || false;// if logout return false instead of sending empty string
        default:
            return state;
    }
} 