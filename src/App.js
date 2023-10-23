import React, { useState, useEffect } from 'react';
import './App.css';
import { ThemeProvider, createTheme } from '@mui/material/styles';


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

const theme = createTheme();

// function PromiseTable(data) {
//     return (
//       <TableContainer component={Paper}>
//         <Table>
//           <TableHead>
//             <TableRow>
//               <TableCell align="center">Kategoria</TableCell>
//               <TableCell align="center">Konkret</TableCell>
//               <TableCell align="center">Spełnione?</TableCell>
//             </TableRow>
//           </TableHead>
//           <TableBody>
//           {Object.entries(data).map(([category, promises]) => 
//                     promises.map((promise, index) => (
//                         <TableRow
//                         key={promise.promise}
//                         // sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
//                     >
//                         <TableCell align="center" component="th" scope="row">{index === 0 ? category : ''}</TableCell>
//                         <TableCell align="center">{promise.promise}</TableCell>
//                         <TableCell align="center">{promise.fulfilled ? '✅' : '❌'}</TableCell>
//                     </TableRow>
//                     ))
//         )}
//           </TableBody>
//         </Table>
//       </TableContainer>
//     );
//   }


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

    const children = (
        <div className="App">
            <header>
                <h1>100 Konkretów KO</h1>
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
                        // sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
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