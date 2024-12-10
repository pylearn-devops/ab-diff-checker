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

import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link, useLocation } from 'react-router-dom';
import { Card, Col, Row, Layout, Menu, Input, Button, Typography } from 'antd';
import { HomeTwoTone, GithubOutlined, SearchOutlined, HeartTwoTone } from '@ant-design/icons';
import DiffChecker from "./DiffChecker";
import JsonYamlTool from './JsonToYaml';
import './App.css';

const { Title, Text } = Typography;
const { Header, Content, Footer } = Layout;

function Home() {
    return (
        <div
            style={{
                padding: '50px',
                minHeight: '100vh',
                background: 'rgba(255, 255, 255, 0.7)',
                backdropFilter: 'blur(5px)',
                color: '#333',
            }}
        >
            <Row gutter={[32, 32]}>
                {/* Left Column for Title and Text */}
                <Col xs={24} md={12} style={{ display: 'flex', alignItems: 'center' }}>
                    <div>
                        <Title
                            level={1}
                            style={{
                                background: 'linear-gradient(135deg, #0056b3, #00c6ff)',
                                WebkitBackgroundClip: 'text',
                                WebkitTextFillColor: 'transparent',
                                fontWeight: 'bold',
                            }}
                        >
                            Welcome to the Ultimate Developer Tools Platform
                        </Title>
                        <Text
                            style={{
                                fontSize: '16px',
                                margin: '20px 0',
                                lineHeight: '1.7',
                                display: 'block',
                                color: '#333', // Neutral color similar to the image
                                fontWeight: '400', // Regular weight
                            }}
                        >
                            Explore a suite of tools designed to make your development process easier and more efficient. Whether you need to compare code, test regex patterns, or convert between JSON and YAML.
                        </Text>

                    </div>
                </Col>

                {/* Right Column for Cards */}
                <Col xs={24} md={12}>
                    <Row gutter={[16, 16]}>
                        <Col span={24}>
                            <Card
                                title={
                                    <span style={{ color: '#0056b3', fontWeight: 'bold' }}>Diff Checker</span>
                                }
                                bordered={false}
                                style={{
                                    background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.9), rgba(235, 245, 255, 0.9))',
                                    borderRadius: '8px',
                                    padding: '16px',
                                    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
                                    backdropFilter: 'blur(10px)',
                                    marginBottom: '20px',
                                }}
                            >
                                <Text style={{ color: '#333' }}>
                                    Compare two versions of text or code files side by side. The Diff Checker highlights additions, deletions, and modifications, helping you visualize differences and track changes efficiently.
                                </Text>
                            </Card>
                        </Col>
                        <Col span={24}>
                            <Card
                                title={
                                    <span style={{ color: '#0056b3', fontWeight: 'bold' }}>JSON to YAML Converter</span>
                                }
                                bordered={false}
                                style={{
                                    background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.9), rgba(235, 245, 255, 0.9))',
                                    borderRadius: '8px',
                                    padding: '16px',
                                    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
                                    backdropFilter: 'blur(10px)',
                                    marginBottom: '20px',
                                }}
                            >
                                <Text style={{ color: '#333' }}>
                                    Convert your JSON data into YAML format quickly and easily. Just paste your JSON data, and our tool will generate a properly formatted YAML output for you to use in your projects.
                                </Text>
                            </Card>
                        </Col>
                        <Col span={24}>
                            <Card
                                title={
                                    <span style={{ color: '#0056b3', fontWeight: 'bold' }}>YAML to JSON Converter</span>
                                }
                                bordered={false}
                                style={{
                                    background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.9), rgba(235, 245, 255, 0.9))',
                                    borderRadius: '8px',
                                    padding: '16px',
                                    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
                                    backdropFilter: 'blur(10px)',
                                    marginBottom: '20px',
                                }}
                            >
                                <Text style={{ color: '#333' }}>
                                    Convert YAML data back into JSON format. Our tool ensures accurate and validated transformations, making it easy to switch between formats for configuration files, APIs, and more.
                                </Text>
                            </Card>
                        </Col>
                    </Row>
                </Col>
            </Row>
        </div>
    );
}

function App() {
    // Hook to get the current location
    const location = useLocation();

    // Determine which key should be selected based on the current path
    const selectedKey = location.pathname === '/' ? '0' :
        location.pathname === '/diffchecker' ? '1' :
            location.pathname === '/jsontoyaml' ? '2' :
                location.pathname === '/regexgen' ? '3' : '';

    return (
        <Layout>
            <Header
                style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    background: 'rgba(255, 255, 255, 0.8)',
                    backdropFilter: 'blur(10px)',
                    borderBottom: '1px solid rgba(255, 255, 255, 0.3)',
                    position: 'sticky',
                    top: 0,
                    zIndex: 1000,
                }}
            >
                <div style={{ display: 'flex', alignItems: 'center', flex: '1' }}>
                    <Link to="/">
                        <HomeTwoTone style={{ fontSize: '20px', marginRight: '10px', marginTop: '20px' }} />
                    </Link>

                    <Menu
                        theme="light"
                        mode="horizontal"
                        style={{ borderBottom: 'none', flex: 'auto', justifyContent: 'flex-start', background: 'transparent' }}
                        selectedKeys={[selectedKey]}
                    >
                        <Menu.Item key="0">
                            <Link to="/">Home</Link>
                        </Menu.Item>
                        <Menu.Item key="1">
                            <Link to="/diffchecker">Text Compare</Link>
                        </Menu.Item>
                        <Menu.Item key="2">
                            <Link to="/jsontoyaml">Json to Yaml</Link>
                        </Menu.Item>
                        {/*<Menu.Item key="3">*/}
                        {/*    <Link to="/regexgen">Regex</Link>*/}
                        {/*</Menu.Item>*/}
                    </Menu>
                </div>

                <div style={{ display: 'flex', alignItems: 'center' }}>
                    <Input
                        placeholder="Search..."
                        prefix={<SearchOutlined />}
                        style={{ width: 200, marginRight: '15px' }}
                    />
                    <Button
                        shape="circle"
                        icon={<GithubOutlined />}
                        href="https://github.com"
                        style={{ marginRight: '15px' }}
                    />
                </div>
            </Header>

            <Content style={{ padding: '50px', marginTop: '64px', background: 'rgba(255, 255, 255, 0.7)', backdropFilter: 'blur(5px)' }}>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/diffchecker" element={<DiffChecker />} />
                    <Route path="/jsontoyaml" element={<JsonYamlTool />} />
                    {/*<Route path="/regexgen" element={<RegexGen />} />*/}
                </Routes>
            </Content>

            <Footer style={{ textAlign: 'center', background: 'rgba(255, 255, 255, 0.8)', backdropFilter: 'blur(5px)' }}>
                Diff Checker and Regex Builder ©2024 Made with <HeartTwoTone /> by AB
            </Footer>
        </Layout>
    );
}

function Root() {
    return (
        <Router>
            <App />
        </Router>
    );
}

export default Root;
