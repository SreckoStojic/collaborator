import {
    addTutorial,
    removeTutorial,
    clearAllTutorials,
} from '@reduxStore/actions/tutorial';
import styles from '@pages/TutorialsSS/TutorialsSS.module.css';
import { IStateTutorial, ITutorial } from '@pages/TutorialsSS/types';
import actionTypes from '@reduxStore/actions/actionTypes';
import React, { useReducer, useState } from 'react';
import { useTutorialReducer } from '@pages/TutorialsWithUseReducer/reducer';

function TutorialsWithUseReducer() {
    const [state, dispatch] = useTutorialReducer();
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
                    onClick={() =>
                        dispatch({
                            type: actionTypes.ADD_TUTORIAL,
                            payload: tutorial,
                        })
                    }
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
                                dispatch({
                                    type: actionTypes.REMOVE_TUTORIAL,
                                    payload: tutorial.id,
                                })
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
                    onClick={() =>
                        dispatch({ type: actionTypes.CLEAR_ALL_TUTORIALS })
                    }
                    className={styles.clearAllBtn}
                >
                    Clear All
                </button>
            </div>
        </div>
    );
}

export default TutorialsWithUseReducer;
