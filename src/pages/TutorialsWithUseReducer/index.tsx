import {
    addTutorial,
    removeTutorial,
    clearAllTutorials,
} from '@reduxStore/actions/tutorial';
import styles from '@pages/TutorialsSS/TutorialsSS.module.css';
import { IStateTutorial, ITutorial } from '@pages/TutorialsSS/types';
import actionTypes from '@reduxStore/actions/actionTypes';
import React, { useReducer, useState } from 'react';

const initialState = {
    tutorials: [
        {
            id: 0,
            title: 'Prvi Tutorijal',
            author: 'Dzon Do',
        },
    ],
};

const tutorialsSSReducer = (state: IStateTutorial, action: any) => {
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
    const newState = { ...state };
    const newTutorial = { ...tutorial, id: generateRandomNumber() };
    newState.tutorials.push(newTutorial);
    console.log('hi');
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

function TutorialsWithUseReducer() {
    const [state, dispatch] = useReducer(tutorialsSSReducer, initialState);
    console.log(state);
    const [tutorial, setTutorial] = useState({
        id: 0,
        title: '',
        author: '',
    });

    function handleOnChangeTitle(event: React.ChangeEvent<HTMLInputElement>) {
        const titleValue = event.target.value;
        setTutorial({ ...tutorial, title: titleValue });
    }

    function handleOnChangeAuthor(event: React.ChangeEvent<HTMLInputElement>) {
        const authorValue = event.target.value;
        setTutorial({ ...tutorial, author: authorValue });
    }

    return (
        <div className={styles.main}>
            <h2>Add New Tutorial</h2>
            <div className={styles.inputWrapper}>
                <input
                    className={styles.input}
                    type="text"
                    name="Title"
                    placeholder="Title"
                    onChange={handleOnChangeTitle}
                />
                <input
                    className={styles.input}
                    type="text"
                    name="Title"
                    placeholder="Author"
                    onChange={handleOnChangeAuthor}
                />
                <button
                    onClick={() => dispatch(addTutorial(tutorial))}
                    className={styles.btn}
                >
                    Add
                </button>
            </div>
            <div className={styles.tutorialsWrapper}>
                {state.tutorials.map((tutorial) => (
                    <div key={tutorial.id} className={styles.tutorial}>
                        <span>{tutorial.title}</span> ---{' '}
                        <span>{tutorial.author}</span>
                        <button
                            onClick={() =>
                                dispatch(removeTutorial(tutorial.id))
                            }
                            className={styles.removeBtn}
                        >
                            X
                        </button>
                    </div>
                ))}
            </div>
            <div>
                <button
                    onClick={() => dispatch(clearAllTutorials())}
                    className={styles.clearAllBtn}
                >
                    Clear All
                </button>
            </div>
        </div>
    );
}

export default TutorialsWithUseReducer;
