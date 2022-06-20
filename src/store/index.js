import {createStore} from 'redux'


const initialState = {
    isLogin: 'false',
    token :'',
  };
const reducerfn = (state= initialState,action)=>{

    if(action.type === 'AUTHRIZATION'){
        return {...state, isLogin: 'true',token:action.payload};
    }
    return state;
};

const store = createStore(reducerfn);

export default store;