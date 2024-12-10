import React, { useState } from 'react';
import { Input, Form, Alert } from 'antd';

const RegexInput = ({ regex, setRegex, setIsRegexValid }) => {
    const [errorMessage, setErrorMessage] = useState(null);

    const handleChange = (e) => {
        const value = e.target.value;
        try {
            new RegExp(value); // Try creating a new RegExp to catch errors.
            setErrorMessage(null);
            setIsRegexValid(true);
        } catch (err) {
            setErrorMessage('Invalid regular expression');
            setIsRegexValid(false);
        }
        setRegex(value);
    };

    return (
        <Form.Item
            label="Regular Expression"
            validateStatus={errorMessage ? 'error' : ''}
            help={errorMessage || ''}
        >
            <Input
                placeholder="Enter your regex pattern"
                value={regex}
                onChange={handleChange}
            />
            {errorMessage && <Alert message={errorMessage} type="error" showIcon />}
        </Form.Item>
    );
};

export default RegexInput;
