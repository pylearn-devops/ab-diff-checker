/**
 * Copyright (c) 2024 AB
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */



import React, { useState } from 'react';
import {Button, Typography, Row, Col, Space, notification, Select, message} from 'antd';
import { CopyTwoTone, ClearOutlined } from '@ant-design/icons';
import CodeMirror from '@uiw/react-codemirror';
import { vscodeLight } from '@uiw/codemirror-theme-vscode';
import { json } from '@codemirror/lang-json';
import { yaml } from '@codemirror/lang-yaml';
import yamlParser from 'js-yaml';
import { createStyles } from 'antd-style';


const { Title , Text} = Typography;
const { Option } = Select;

// Configure global notification settings for a centered, minimal look
notification.config({
    placement: 'top',
    top: 20, // Distance from the top of the viewport
    duration: 2, // Duration before the notification disappears
    maxCount: 3, // Limit the number of notifications shown at the same time
});

const useStyle = createStyles(({ prefixCls, css }) => ({
    linearGradientButton: css`
        &.${prefixCls}-btn-primary:not([disabled]):not(.${prefixCls}-btn-dangerous) {
            border-width: 0;

            > span {
                position: relative;
            }

            &::before {
                content: '';
                background: linear-gradient(135deg, #6253e1, #04befe);
                position: absolute;
                inset: 0;
                opacity: 1;
                transition: all 0.3s;
                border-radius: inherit;
            }

            &:hover::before {
                opacity: 0;
            }
        }
    `,
}));

const JsonYamlTool = () => {
    const [input, setInput] = useState('');
    const [output, setOutput] = useState('');
    const [mode, setMode] = useState('json');
    const [outputType, setOutputType] = useState('json');
    const { styles } = useStyle();

    const validateData = () => {
        try {
            if (mode === 'json') {
                JSON.parse(input);
                message.success('JSON is valid', 2);
                setOutput('Valid JSON');
            } else {
                try {
                    JSON.parse(input);
                    setOutput('Invalid YAML: Input is JSON');
                    message.error('Input is JSON but not valid YAML', 2);
                    return;
                } catch (jsonError) {
                    yamlParser.load(input);
                    message.success('YAML is valid', 2);
                    setOutput('Valid YAML');
                }
            }
        } catch (error) {
            setOutput(`Invalid ${mode.toUpperCase()}: ${error.message}`);
            message.error(`Invalid ${mode.toUpperCase()}`, 2);
        }
    };

    const convertData = () => {
        try {
            if (mode === 'json') {
                const parsedJson = JSON.parse(input);
                const yamlOutput = yamlParser.dump(parsedJson);
                setOutputType('yaml');
                setOutput(yamlOutput);
                message.success('Converted to YAML successfully', 2);
            } else {
                const parsedYaml = yamlParser.load(input);
                const jsonOutput = JSON.stringify(parsedYaml, null, 2);
                setOutputType('json');
                setOutput(jsonOutput);
                message.success('Converted to JSON successfully', 2);
            }
        } catch (error) {
            setOutput(`Error: ${error.message}`);
            message.error('Error converting data', 2);
        }
    };

    const beautifyData = () => {
        try {
            if (mode === 'json') {
                const parsedJson = JSON.parse(input);
                const beautifiedJson = JSON.stringify(parsedJson, null, 4);
                setOutputType('json');
                setOutput(beautifiedJson);
                message.success('JSON has been beautified', 2);
            } else {
                const parsedYaml = yamlParser.load(input);
                const beautifiedYaml = yamlParser.dump(parsedYaml);
                setOutputType('yaml');
                setOutput(beautifiedYaml);
                message.success('YAML has been beautified', 2);
            }
        } catch (error) {
            setOutput(`Error: ${error.message}`);
            message.error('Error beautifying data', 2);
        }
    };

    const copyToClipboard = () => {
        if (output) {
            navigator.clipboard.writeText(output)
                .then(() => {
                    message.success(`${outputType.toUpperCase()} text copied to clipboard!`, 2);
                })
                .catch(() => {
                    message.error('Failed to copy output', 2);
                });
        } else {
            message.warning('No content to copy!', 2);
        }
    };

    // Function to copy the text to the clipboard
    // eslint-disable-next-line
    const handleCopy = (text, label) => {
        navigator.clipboard.writeText(text);
        message.success(`${label} text copied to clipboard!`);
    };


    return (
        <div style={{ maxWidth: '100%', margin: 'auto', padding: '20px' }}>
            <Title
                level={4}
                style={{
                    background: 'linear-gradient(135deg, #0056b3, #00c6ff)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    marginBottom: '20px',
                }}
            >
                JSON/YAML Converter
            </Title>


            <Select
                value={mode}
                onChange={(value) => setMode(value)}
                style={{ marginBottom: '20px', width: '200px' }}
            >
                <Option value="json">JSON Mode</Option>
                <Option value="yaml">YAML Mode</Option>
            </Select>

            <Row gutter={16}>
                <Col span={12}>
                    <div style={{ marginBottom: '20px', borderRadius: '10px', overflow: 'hidden', border: '1px solid #ddd' }}>
                        <div style={{ padding: '10px', backgroundColor: '#f0f2f5', display: 'flex', justifyContent: 'space-between' }}>
                            <span>{mode.toUpperCase()} Input</span>
                            <Space>
                                <Button type="text" icon={<CopyTwoTone twoToneColor="#1890ff" />} onClick={copyToClipboard}>Copy</Button>
                                <Button type="text" icon={<ClearOutlined style={{ color: '#1890ff' }} />} onClick={() => { setInput(''); message.warning(`${mode.toUpperCase()} input cleared`, 2); }}>Clear</Button>
                            </Space>
                        </div>
                        <CodeMirror
                            value={input}
                            onChange={(value) => setInput(value)}
                            theme={vscodeLight}
                            extensions={[mode === 'json' ? json() : yaml()]}
                            style={{
                                border: 'none',
                                borderRadius: '0 0 10px 10px',
                                backgroundColor: '#ffffff',
                                height: '400px',
                                width: '100%',
                                overflow: 'auto',
                            }}
                        />
                    </div>
                </Col>

                <Col span={12}>
                    <div style={{ marginBottom: '20px', borderRadius: '10px', overflow: 'hidden', border: '1px solid #ddd' }}>
                        <div style={{ padding: '10px', backgroundColor: '#f0f2f5', display: 'flex', justifyContent: 'space-between' }}>
                            <span>{outputType.toUpperCase()} Output</span>
                            <Space>
                                <Button type="text" icon={<CopyTwoTone twoToneColor="#1890ff" />} onClick={copyToClipboard}>Copy</Button>
                                <Button type="text" icon={<ClearOutlined style={{ color: '#1890ff' }} />} onClick={() => { setOutput(''); message.warning('Output cleared', 2); }}>Clear</Button>
                            </Space>
                        </div>
                        <CodeMirror
                            value={output}
                            theme={vscodeLight}
                            extensions={[outputType === 'json' ? json() : yaml()]}
                            editable={false}
                            style={{
                                border: 'none',
                                borderRadius: '0 0 10px 10px',
                                backgroundColor: '#ffffff',
                                height: '400px',
                                width: '100%',
                                overflow: 'auto',
                            }}
                        />
                    </div>
                </Col>
            </Row>

            <div style={{ marginTop: '20px', textAlign: 'center' }}>
                <Button type="primary" onClick={validateData} style={{ margin: '0 10px' }}>Validate</Button>
                <Button type="default" onClick={convertData} style={{ margin: '0 10px' }}>Convert</Button>
                <Button
                    type="primary"
                    className={styles.linearGradientButton}
                    onClick={beautifyData}
                    style={{ margin: '0 10px' }}
                >
                    Beautify
                </Button>
            </div>

            {/* FAQ Section */}
            <div style={{ marginTop: '40px' }}>
                <Row gutter={[16, 16]}>
                    <Col span={8}>
                        <Title level={4}>How does the JSON to YAML/YAML to JSON tool work?</Title>
                        <Text>This tool allows you to convert JSON data into YAML format and vice versa. Simply enter your JSON or YAML data, and the tool will provide a formatted and valid conversion instantly.</Text>
                    </Col>
                    <Col span={8}>
                        <Title level={4}>What are the benefits of using this tool?</Title>
                        <Text>It saves time by automatically converting and formatting your data, reducing the risk of syntax errors. It’s also great for developers working with APIs, configuration files, or other structured data formats.</Text>
                    </Col>
                    <Col span={8}>
                        <Title level={4}>Can the tool validate my JSON or YAML input?</Title>
                        <Text>Yes! The tool validates your JSON or YAML input and alerts you if any errors are detected, helping you ensure that your data is always properly formatted.</Text>
                    </Col>
                </Row>
                <Row gutter={[16, 16]} style={{ marginTop: '20px' }}>
                    <Col span={8}>
                        <Title level={4}>How do I convert JSON to YAML?</Title>
                        <Text>To convert JSON to YAML, paste your JSON data into the input area, select JSON mode, and click "Convert". The YAML output will appear in the adjacent area.</Text>
                    </Col>
                    <Col span={8}>
                        <Title level={4}>How do I convert YAML to JSON?</Title>
                        <Text>To convert YAML to JSON, paste your YAML data into the input area, select YAML mode, and click "Convert". The JSON output will be displayed for you to copy and use.</Text>
                    </Col>
                    <Col span={8}>
                        <Title level={4}>Can I beautify my JSON or YAML data?</Title>
                        <Text>Yes, you can beautify your JSON or YAML data by clicking the "Beautify" button. This will format your input for better readability, making it easier to review and edit.</Text>
                    </Col>
                </Row>
            </div>
        </div>
    );
};

export default JsonYamlTool;
