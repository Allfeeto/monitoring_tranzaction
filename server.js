const express = require('express');
const fs = require('fs');
const csvParser = require('csv-parser');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());

const csvFilePath = './dataCSV/data.csv';

app.get('/api/transactions', (req, res) => {
    const transactions = [];

    fs.createReadStream(csvFilePath)
        .pipe(csvParser({ separator: ';' }))
        .on('data', (row) => {
            if (row.Fraud === '1') {
                transactions.push(row);
            }
        })
        .on('end', () => {
            res.json(transactions);
        })
        .on('error', (error) => {
            console.error('Error reading CSV:', error);
            res.status(500).send('Internal Server Error');
        });
});

app.post('/api/fraud-transactions', (req, res) => {
    const fraudTransaction = req.body;

    fs.appendFile(csvFilePath, `\n${fraudTransaction.Column1};${fraudTransaction.customer};1`, (err) => {
        if (err) {
            console.error('Error appending to CSV:', err);
            res.status(500).send('Internal Server Error');
        } else {
            res.status(200).send('Fraud transaction added successfully');
        }
    });
});

let successfulTransactionCount = 0;

app.post('/api/successful-transaction', (req, res) => {
    successfulTransactionCount++;

    res.status(200).send(`Successful transaction added successfully. Total successful transactions: ${successfulTransactionCount}`);
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
    console.log('Сервер успешно запущен.');
});
