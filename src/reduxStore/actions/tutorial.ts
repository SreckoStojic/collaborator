import actionTypes from '@reduxStore/actions/actionTypes';
import { ITutorial } from '@pages/TutorialsSS/types';

export const addTutorial = (tutorial: ITutorial) => {
    return {
        type: actionTypes.ADD_TUTORIAL,
        payload: tutorial,
    };
};

export const removeTutorial = (id: number) => {
    return {
        type: actionTypes.REMOVE_TUTORIAL,
        payload: id,
    };
};

export const clearAllTutorials = () => {
    return {
        type: actionTypes.CLEAR_ALL_TUTORIALS,
    };
};
