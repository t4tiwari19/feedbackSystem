import axios from 'axios';
import { FETCH_USER , FETCH_SURVEYS } from './types'


// Redux thunk gives us ability to dispatch a function asynchonously whenever being called 
//instead of immediately dispatching a function to send off all reducers to change states
export const fetchUser = () => async (dispatch) => {
    
    const res = await axios.get('/api/current_user')
    dispatch({ type:FETCH_USER, payload:res.data });
};
    
export const handleToken = (token) => async (dispatch) => {

    const res = await axios.post('/api/stripe',token);
    dispatch({ type:FETCH_USER, payload:res.data });
};

export const submitSurvey = (values, history) => async dispatch => {
    const res = await axios.post('/api/surveys', values);
  
    history.push('/surveys');
    dispatch({ type: FETCH_USER, payload: res.data });
};
  
export const fetchSurveys = () => async dispatch => {
const res = await axios.get('/api/surveys');

dispatch({ type: FETCH_SURVEYS, payload: res.data });
};

