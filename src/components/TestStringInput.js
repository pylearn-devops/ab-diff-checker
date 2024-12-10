import React from 'react';
import { Input, Form } from 'antd';

const { TextArea } = Input;

const TestStringInput = ({ testString, setTestString }) => {
    const handleChange = (e) => setTestString(e.target.value);

    return (
        <Form.Item label="Test String">
            <TextArea
                rows={6}
                placeholder="Enter the string to test your regex"
                value={testString}
                onChange={handleChange}
            />
        </Form.Item>
    );
};

export default TestStringInput;
