import React from 'react';
import { useParams } from 'react-router-dom';

export default function GiftDetail() {
    const { id } = useParams();

    return (
        <div className="space-y-6">
            <h2 className="text-3xl font-bold tracking-tight">Gift Detail: {id}</h2>
        </div>
    );
}
