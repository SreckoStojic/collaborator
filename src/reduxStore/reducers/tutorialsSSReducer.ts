import { IStateTutorial, ITutorial } from '@pages/TutorialsSS/types';
import actionTypes from '@reduxStore/actions/actionTypes';
import { Action } from 'redux';

const initialState = {
    tutorials: [
        {
            id: 0,
            title: 'Prvi Tutorijal',
            author: 'Dzon Do',
        },
    ],
};

const tutorialsSSReducer = (state = initialState, action: any) => {
    switch (action.type) {
        case actionTypes.ADD_TUTORIAL: {
            const newState = addNewTutorial(state, action.payload);
            return {
                ...newState,
                tutorials: [...newState.tutorials],
            };
        }
        case actionTypes.REMOVE_TUTORIAL: {
            const newState = removeTutorial(state, action.payload);
            return {
                ...newState,
                tutorials: [...newState.tutorials],
            };
        }
        case actionTypes.CLEAR_ALL_TUTORIALS: {
            const newState = clearAllTutorials(state);
            return {
                ...newState,
                tutorials: [...newState.tutorials],
            };
        }
        default:
            return state;
    }
};

export default tutorialsSSReducer;

function addNewTutorial(state: IStateTutorial, tutorial: ITutorial) {
    const newState = state;
    tutorial.id = generateRandomNumber();
    newState.tutorials.push(tutorial);
    return newState;
}

function removeTutorial(state: IStateTutorial, id: number) {
    const newState = state;
    newState.tutorials = newState.tutorials.filter((val) => val.id !== id);
    return newState;
}

function clearAllTutorials(state: IStateTutorial) {
    const newState = state;
    newState.tutorials = [];
    return newState;
}

function generateRandomNumber() {
    return Math.floor(Math.random() * 1000 + Math.random() * 500);
}
