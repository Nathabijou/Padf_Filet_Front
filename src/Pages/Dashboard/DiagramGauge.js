import React from 'react';
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

function DiagramGauge() {
    return (
        <div style={{ width: '100px' }}>
            <CircularProgressbar value={75} text={`${75}%`} />
        </div>
    );
}

export default DiagramGauge;
