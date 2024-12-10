import React from 'react';
import { Form, List, Card } from 'antd';

const MatchResults = ({ regex, testString, isRegexValid }) => {
    let matches = [];
    if (isRegexValid) {
        try {
            const reg = new RegExp(regex, 'g');
            matches = [...testString.matchAll(reg)];
        } catch (e) {
            matches = ['Invalid regex'];
        }
    } else {
        matches = ['Invalid regex'];
    }

    return (
        <Form.Item label="Match Results">
            <Card>
                <List
                    bordered
                    dataSource={matches.length ? matches : ['No matches found']}
                    renderItem={(item) => <List.Item>{item[0]}</List.Item>}
                />
            </Card>
        </Form.Item>
    );
};

export default MatchResults;
