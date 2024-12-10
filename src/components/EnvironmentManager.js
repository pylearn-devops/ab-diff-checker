import React from 'react';
import { Form, Input, Button, Select, Card, notification } from 'antd';

const { Option } = Select;

const EnvironmentManager = ({ environments, setEnvironments, activeEnvironment, setActiveEnvironment }) => {
    const [form] = Form.useForm();

    const saveEnvironment = (values) => {
        const newEnvironment = { name: values.name, variables: JSON.parse(values.variables) };
        const updatedEnvironments = [...environments, newEnvironment];
        setEnvironments(updatedEnvironments);
        localStorage.setItem('environments', JSON.stringify(updatedEnvironments));
        notification.success({ message: 'Environment saved!' });
    };

    return (
        <Card title="Manage Environments" bordered>
            {/* Environment Selector */}
            <Form.Item label="Select Environment">
                <Select value={activeEnvironment} onChange={setActiveEnvironment} placeholder="Select an environment">
                    {environments.map((env, index) => (
                        <Option key={index} value={env.name}>
                            {env.name}
                        </Option>
                    ))}
                </Select>
            </Form.Item>

            {/* Add New Environment Form */}
            <Form form={form} onFinish={saveEnvironment}>
                <Form.Item label="Environment Name" name="name" rules={[{ required: true }]}>
                    <Input placeholder="e.g., Development" />
                </Form.Item>
                <Form.Item label="Variables (JSON format)" name="variables" rules={[{ required: true }]}>
                    <Input.TextArea placeholder='{"baseURL": "https://api.example.com", "apiKey": "abc123"}' rows={4} />
                </Form.Item>
                <Button type="primary" htmlType="submit">Save Environment</Button>
            </Form>
        </Card>
    );
};

export default EnvironmentManager;
