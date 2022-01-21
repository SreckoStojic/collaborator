import { IStateTutorial, ITutorial } from '@pages/TutorialsSS/types';
import actionTypes from '@reduxStore/actions/actionTypes';
import { useReducer } from 'react';
const initialState = {
    tutorials: [
        {
            id: 0,
            title: 'Prvi Tutorijal',
            author: 'Dzon Do',
        },
    ],
};
export const tutorialsSSReducer = (state: IStateTutorial, action: any) => {
    console.log(action);
    switch (action.type) {
        case actionTypes.ADD_TUTORIAL: {
            const newState = addNewTutorialRF(state, action.payload);
            return {
                ...newState,
                tutorials: [...newState.tutorials],
            };
        }
        case actionTypes.REMOVE_TUTORIAL: {
            const newState = removeTutorialRF(state, action.payload);
            return {
                ...newState,
                tutorials: [...newState.tutorials],
            };
        }
        case actionTypes.CLEAR_ALL_TUTORIALS: {
            const newState = clearAllTutorialsRF(state);
            return {
                ...newState,
                tutorials: [...newState.tutorials],
            };
        }
        default:
            return state;
    }
};

function addNewTutorialRF(state: IStateTutorial, tutorial: ITutorial) {
    const newTutorial = { ...tutorial, id: generateRandomNumber() };
    //newState.tutorials.push(newTutorial)
    const newState = { ...state, tutorials: [...state.tutorials, newTutorial] };
    return newState;
}

function removeTutorialRF(state: IStateTutorial, id: number) {
    return {
        ...state,
        tutorials: state.tutorials.filter((val) => val.id !== id),
    };
}

function clearAllTutorialsRF(state: IStateTutorial) {
    return { ...state, tutorials: [] };
}

function generateRandomNumber() {
    return Math.floor(Math.random() * 1000 + Math.random() * 500);
}

export function useTutorialReducer() {
    return useReducer(tutorialsSSReducer, initialState);
}
