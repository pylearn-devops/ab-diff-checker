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


import React, { useState, useCallback } from 'react';
import { diffLines } from 'unidiff';
import DiffViewer from 'react-diff-viewer-continued';
import CodeMirror from '@uiw/react-codemirror';
import { vscodeLight } from '@uiw/codemirror-theme-vscode';
import { Row, Col, Button, Typography, message } from 'antd';
import { CopyTwoTone, SwapOutlined, ClearOutlined } from '@ant-design/icons';
import { javascript } from '@codemirror/lang-javascript';
import { python } from '@codemirror/lang-python';
import { html } from '@codemirror/lang-html';
import { css } from '@codemirror/lang-css';
import { yaml } from '@codemirror/lang-yaml';
import './css/styles.css'; // Custom styles
import uniqLogo from './assets/site-logo.svg';

const { Title, Text } = Typography;

function DiffChecker() {
    const [oldText, setOldText] = useState(''); // Original text state
    const [newText, setNewText] = useState(''); // Modified text state

    // eslint-disable-next-line
    const [diffText, setDiffText] = useState(''); // State for the diff text

    // eslint-disable-next-line
    const updateDiffText = useCallback(() => {
        const diff = diffLines(oldText, newText);
        setDiffText(diff);
    }, [oldText, newText]);

    // Function to copy the text to the clipboard
    const handleCopy = (text, label) => {
        navigator.clipboard.writeText(text);
        message.success(`${label} text copied to clipboard!`);
    };

    // Function to swap original and modified text
    const handleSwap = () => {
        const temp = oldText;
        setOldText(newText);
        setNewText(temp);
    };

    // Function to clear both text areas and reset the diff
    const handleClear = (field) => {
        if (field === 'original') {
            setOldText('');
        } else {
            setNewText('');
        }
        setDiffText(''); // Clear the stored diff text
    };

    return (
        <div style={{padding: '20px', marginTop: '5px'}}>

            <div style={{margin: '0', padding: '0', boxSizing: 'border-box'}}>
                <header style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'flex-start',
                    marginBottom: '10px',
                    padding: '0',
                    marginTop: '0',
                    height: '50px'
                }}>
                    <img src={uniqLogo} alt="Logo" style={{height: '40px', marginRight: '10px'}}/>
                    <Title
                        level={3}
                        style={{
                            background: 'linear-gradient(135deg, #0056b3, #00c6ff)',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                            margin: '0',
                            whiteSpace: 'nowrap',
                            lineHeight: '40px',
                        }}
                    >
                        TextCompare
                    </Title>

                </header>
            </div>


            <Row gutter={[16, 16]}>
                <Col span={12}>
                    {/* Original Text header with actions */}
                    <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                        <Title level={4} style={{marginBottom: 0}}>
                            Original
                        </Title>
                        <div>
                            <Button
                                type="link"
                                icon={<CopyTwoTone/>}
                                onClick={() => handleCopy(oldText, 'Original')}
                                style={{marginRight: '10px'}}
                            >
                                Copy
                            </Button>
                            <Button type="link" icon={<SwapOutlined/>} onClick={handleSwap}>Switch</Button>
                            <Button type="link" icon={<ClearOutlined/>}
                                    onClick={() => handleClear('original')}>Clear</Button>
                        </div>
                    </div>
                    <CodeMirror
                        value={oldText}
                        height="300px"
                        theme={vscodeLight}
                        extensions={[javascript(), python(), html(), css(), yaml()]}
                        onChange={(value) => setOldText(value)}
                        style={{
                            borderRadius: '10px',
                            padding: '10px',
                            border: '1px solid #d9d9d9',
                            backgroundColor: '#f9f9f9',
                        }}
                    />
                </Col>

                <Col span={12}>
                    {/* Changed Text header with actions */}
                    <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                        <Title level={4} style={{marginBottom: 0}}>
                            Modified
                        </Title>
                        <div>
                            <Button
                                type="link"
                                icon={<CopyTwoTone/>}
                                onClick={() => handleCopy(newText, 'Modified')}
                                style={{marginRight: '10px'}}
                            >
                                Copy
                            </Button>
                            <Button type="link" icon={<SwapOutlined/>} onClick={handleSwap}>Switch</Button>
                            <Button type="link" icon={<ClearOutlined/>}
                                    onClick={() => handleClear('modified')}>Clear</Button>
                        </div>
                    </div>
                    <CodeMirror
                        value={newText}
                        height="300px"
                        theme={vscodeLight}
                        extensions={[javascript(), python(), html(), css(), yaml()]}
                        onChange={(value) => setNewText(value)}
                        style={{
                            borderRadius: '10px',
                            padding: '10px',
                            border: '1px solid #d9d9d9',
                            backgroundColor: '#f9f9f9',
                        }}
                    />
                </Col>
            </Row>

            {/* Displaying the Diff View if either oldText or newText is not empty */}
            {(oldText || newText) && (
                <Row style={{marginTop: '40px'}} className="diff-output">
                    <div className="diff-container" style={{position: 'relative'}}>
                        <DiffViewer
                            oldValue={oldText}
                            newValue={newText}
                            splitView={true}
                            styles={{
                                diffContainer: {
                                    maxHeight: '400px', // Adjust this as needed
                                    overflowY: 'auto',  // Enable scroll if content is large
                                    border: '1px solid #d9d9d9',
                                    padding: '10px',
                                    backgroundColor: '#f9f9f9',
                                    borderRadius: '10px',
                                }
                            }}
                        />
                    </div>
                </Row>
            )}


            {/* FAQ Section */}
            <div style={{marginTop: '40px'}}>
                <Row gutter={[16, 16]}>
                    <Col span={8}>
                        <Title level={4}>How does the diff tool work?</Title>
                        <Text>A diff tool works by analyzing the differences between two text inputs and highlighting
                            changes such as additions, deletions, and modifications.</Text>
                    </Col>
                    <Col span={8}>
                        <Title level={4}>What can I use this tool for?</Title>
                        <Text>This tool is useful for comparing different versions of text or code files, helping to
                            visualize differences and track changes efficiently.</Text>
                    </Col>
                    <Col span={8}>
                        <Title level={4}>Can this tool compare code files?</Title>
                        <Text>Yes! The diff tool can be used to compare code files, which is helpful in identifying
                            changes made between different versions of the codebase.</Text>
                    </Col>
                </Row>
                <Row gutter={[16, 16]} style={{marginTop: '20px'}}>
                    <Col span={8}>
                        <Title level={4}>How do I use the diff tool?</Title>
                        <Text>Simply paste your original and modified text into the two text areas, and the tool will
                            display a side-by-side comparison of the differences.</Text>
                    </Col>
                    <Col span={8}>
                        <Title level={4}>What file types are supported?</Title>
                        <Text>This tool supports any text-based file types, including .txt, .js, .py, .html, .css,
                            .yaml, and more.</Text>
                    </Col>
                    <Col span={8}>
                        <Title level={4}>How do I view the entire diff?</Title>
                        <Text>If sections of the text are unchanged, the diff viewer will collapse them automatically.
                            You can expand these sections to view all changes.</Text>
                    </Col>
                </Row>
            </div>
        </div>
    );
}

export default DiffChecker;
