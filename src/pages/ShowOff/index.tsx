import React, { useEffect, useState } from 'react';
import styles from './ShowOff.module.css';
import { useInterval } from '@pages/ShowOff/useInterval';

function ShowOff() {
    const [text, setText] = useState('');
    const [color, setColor] = useState({
        colorClass: `${styles.whiteText}`,
        colorName: 'white',
    });
    const [count, setCount] = useState(0);
    const [msgVisible, setMsgVisible] = useState(false);

    const changeTextColor = (colorClass: any, colorName: string) => {
        setColor({
            ...color,
            colorClass: colorClass,
            colorName: colorName,
        });
    };

    useEffect(() => {
        const timer = setInterval(() => {
            setText('I AM ASYNC');
            changeTextColor(`${styles.orangeText}`, 'orange');
        }, 5000);
        return () => clearTimeout(timer);
    }, [text]);

    useEffect(() => {
        const timer = setInterval(() => {
            setMsgVisible(true);
        }, 1000 * 10);
        return () => clearTimeout(timer);
    }, []);

    useInterval(() => {
        if (color.colorName === 'orange') {
            changeTextColor(`${styles.whiteText}`, 'white');
        } else {
            changeTextColor(`${styles.orangeText}`, 'orange');
        }
        setCount((count) => count + 1);
    }, 1000);
    return (
        <div className={styles.main}>
            <div className={color.colorClass}>{text}</div>
            <div className={color.colorClass}>{count}</div>
            {msgVisible && (
                <div className={styles.main}>
                    <div> ARE YOU ASLEEP?</div>
                    <button
                        className={styles.btn}
                        onClick={() => setMsgVisible(false)}
                    >
                        NO
                    </button>
                </div>
            )}
        </div>
    );
}

export default ShowOff;
