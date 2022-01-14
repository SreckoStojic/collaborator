import {
    addTutorial,
    removeTutorial,
    clearAllTutorials,
} from '@reduxStore/actions/tutorial';
import { RootState } from '@reduxStore/reducers';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styles from './TutorialsSS.module.css';

function TutorialsSS() {
    const tutorials = useSelector(
        (state: RootState) => state.tutorial.tutorials
    );
    const loadTutorials = tutorials.length > 0 ? true : false;
    const index = tutorials.length;
    const dispatch = useDispatch();
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
                {tutorials.map((tutorial) => (
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

export default TutorialsSS;
