import { useState } from 'react';

interface IUseInputValidationHook {
    value: string;
    handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    isValid: boolean;
}

export function useInputValidation(): any {
    const [isValid, setIsValid] = useState(false);
    const [value, setValue] = useState('');

    function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
        checkValidation(event.target.value);
        setValue(event.target.value);
    }
    function checkValidation(input: string) {
        if (
            input === '' ||
            input.includes('#') ||
            input.includes('$') ||
            input.includes('%')
        ) {
            setIsValid(false);
        } else {
            setIsValid(true);
        }
    }

    return [value, handleChange, isValid];
}
