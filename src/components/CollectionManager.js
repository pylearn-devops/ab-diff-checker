import React, { useState } from 'react';
import { Card, Button, Input, List, notification } from 'antd';

const CollectionManager = ({ collections, setCollections, saveRequestToCollection, loadRequest }) => {
    const [collectionName, setCollectionName] = useState('');

    return (
        <Card title="Collections">
            {/* Form to Save a Request to a Collection */}
            <Input
                placeholder="Collection Name"
                value={collectionName}
                onChange={(e) => setCollectionName(e.target.value)}
                style={{ marginBottom: '10px' }}
            />
            <Button
                type="primary"
                onClick={() => {
                    saveRequestToCollection(collectionName);
                    notification.success({ message: 'Request saved to collection!' });
                }}
            >
                Save Request to Collection
            </Button>

            {/* Display Collections */}
            <List
                dataSource={collections}
                renderItem={(collection) => (
                    <Card title={collection.collectionName} style={{ marginTop: '20px' }}>
                        {collection.requests.map((request, index) => (
                            <Button key={index} onClick={() => loadRequest(request)}>
                                {request.name}
                            </Button>
                        ))}
                    </Card>
                )}
            />
        </Card>
    );
};

export default CollectionManager;
