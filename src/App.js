import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
    const [data, setData] = useState({});
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        fetch('data.json')
            .then(response => response.json())
            .then(data => {
                setData(data);
                const totalPromises = Object.values(data).flat().length;
                const fulfilledPromises = Object.values(data).flat().filter(p => p.fulfilled).length;
                setProgress((fulfilledPromises / totalPromises) * 100);
            })
            .catch(error => console.error('Error fetching the JSON data:', error));
    }, []);

    return (
        <div className="App">
            <header>
                <h1>100 Konkretów KO</h1>
                <h2>Spełnione w {progress.toFixed(1)}%</h2>
            </header>
            <div className="progress-bar">
                <div className="progress" style={{ width: `${progress}%` }}></div>
            </div>
            <table>
                <thead>
                    <tr>
                        <th>Kategoria</th>
                        <th>Konkret</th>
                        <th>Spełnione?</th>
                    </tr>
                </thead>
                <tbody>
                    {Object.entries(data).map(([category, promises]) => 
                        promises.map((promise, index) => (
                            <tr key={index}>
                                <td>{index === 0 ? category : ''}</td>
                                <td>{promise.promise}</td>
                                <td>{promise.fulfilled ? '✅' : '❌'}</td>
                            </tr>
                        ))
                    )}
                </tbody>
            </table>
        </div>
    );
}

export default App;