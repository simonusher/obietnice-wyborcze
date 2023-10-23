import React, { useState, useEffect } from 'react';
import './App.css';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';



import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { LinearProgress } from '@mui/material';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';

const TABS = [
  {"name": "100 Konkretów KO", "data": "data.json"},
  {"name": "Program Wyborczy Lewicy", "data": "data.json"},
]

const theme = createTheme();

function App() {
    const [data, setData] = useState({});
    const [progress, setProgress] = useState(0);
    const [activeTab, setActiveTab] = useState(0);


    useEffect(() => {
      const jsonData = TABS[activeTab].data;
        fetch(jsonData)
            .then(response => response.json())
            .then(data => {
                setData(data);
                const totalPromises = Object.values(data).flat().length;
                const fulfilledPromises = Object.values(data).flat().filter(p => p.fulfilled).length;
                setProgress((fulfilledPromises / totalPromises) * 100);
            })
            .catch(error => console.error('Error fetching the JSON data:', error));
    }, [activeTab]);

    const children = (
        <div className="App">
            <Tabs value={activeTab} onChange={(_, newValue) => setActiveTab(newValue)} centered>
              {TABS.map((tab, index) => <Tab key={index} label={tab.name} />)}
            </Tabs>
            <header>
                <h1>{TABS[activeTab].name}</h1>
                <h2>Spełnione w {progress.toFixed(1)}%</h2>
            </header>
            <LinearProgress variant="determinate" value={progress} 
            sx={{
                height: 20,
                borderRadius: 5,
                marginBottom: 2
              }}/>
            <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell align="center">Kategoria</TableCell>
              <TableCell align="center">Konkret</TableCell>
              <TableCell align="center">Spełnione?</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
          {Object.entries(data).map(([category, promises]) => 
                    promises.map((promise, index) => (
                        <TableRow
                        key={promise.promise}
                    >
                        <TableCell align="center" component="th" scope="row">{index === 0 ? category : ''}</TableCell>
                        <TableCell align="center">{promise.promise}</TableCell>
                        <TableCell align="center">{promise.fulfilled ? <CheckIcon color="success" /> : <CloseIcon color="error" />}</TableCell>
                    </TableRow>
                    ))
        )}
          </TableBody>
        </Table>
      </TableContainer>
        </div>
    );
    return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
}

export default App;