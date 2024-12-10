import React from 'react';
import { Form, Card } from 'antd';

const Explanation = ({ regex, isRegexValid }) => {
    return (
        <Form.Item label="Explanation">
            <Card>
                {isRegexValid ? (
                    <p>{`Explanation for regex: ${regex}`}</p>
                ) : (
                    <p>Enter a valid regular expression to see the explanation.</p>
                )}
            </Card>
        </Form.Item>
    );
};

export default Explanation;
