import React, { Ref } from 'react';
import styles from '@pages/FormPractice/Form.module.css';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

const formSchema = yup.object().shape({
    username: yup.string().required(),
    email: yup.string().email().required(),
    age: yup.number().positive().min(13).required(),
    password: yup
        .string()
        .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/)
        .required(),
    confirmPassword: yup.string().oneOf([yup.ref('password'), null]),
});

function FormPractice() {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(formSchema),
        mode: 'onChange',
        reValidateMode: 'onChange',
    });

    const submitForm = (data: any) => {
        console.log(data);
    };
    return (
        <div className={styles.main}>
            <h2>Register Here</h2>
            <form onSubmit={handleSubmit(submitForm)}>
                <div className={styles.inputWrapper}>
                    <input
                        className={styles.input}
                        type="text"
                        placeholder="Username..."
                        {...register('username')}
                    />
                    <p> {errors.username && 'Username is required'} </p>
                    <input
                        className={styles.input}
                        type="text"
                        placeholder="Email..."
                        {...register('email')}
                    />

                    <p> {errors.email && 'Not valid input email type'} </p>
                    <input
                        className={styles.input}
                        type="number"
                        placeholder="Age..."
                        {...register('age')}
                    />
                    <p> {errors.age && '13+'} </p>
                    <input
                        className={styles.input}
                        type="text"
                        placeholder="Password..."
                        {...register('password')}
                    />
                    <p>
                        {' '}
                        {errors.password &&
                            '8 characters minimum, 1 uppercase, 1 number'}{' '}
                    </p>
                    <input
                        className={styles.input}
                        type="text"
                        placeholder="Confirm Password..."
                        {...register('confirmPassword')}
                    />
                    <p>
                        {' '}
                        {errors.confirmPassword &&
                            'Passwords Should Match!'}{' '}
                    </p>
                </div>
                <button type="submit" className={styles.btn}>
                    Register
                </button>
            </form>
        </div>
    );
}

export default FormPractice;
