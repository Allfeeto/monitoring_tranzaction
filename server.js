const fs = require('fs');
const path = require('path'); // Добавлено
const csvParser = require('csv-parser');
const express = require('express');
const cors = require('cors');
const multer = require('multer');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());

const csvFilePath = './dataCSV/data.csv';

// Middleware для загрузки файлов
const upload = multer({ dest: 'uploads/' });

// Функция для обновления таблицы транзакций с сохраненными данными
function updateTransactionTable(transactions) {
    // Реализуйте логику обновления таблицы транзакций
    // ...
}

// Утилита для удаления файла
function deleteFile(filePath, res) {
    try {
        if (fs.existsSync(filePath)) {
            fs.unlinkSync(filePath);
            console.log('File deleted successfully');
            res.json({ success: true, message: 'File deleted successfully' });
        } else {
            console.log('File not found');
            res.status(404).json({ error: 'File not found' });
        }
    } catch (error) {
        console.error('Error deleting file:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

// Роут для загрузки файла
app.post('/api/upload', upload.single('file'), (req, res) => {
    const { file } = req;

    if (!file) {
        return res.status(400).json({ error: 'No file provided' });
    }

    const filePath = file.path;

    fs.createReadStream(filePath)
        .pipe(csvParser({ separator: ';' }))
        .on('data', (row) => {
            // Дополнительная логика обработки данных из CSV файла, если необходимо
        })
        .on('end', () => {
            // Дополнительная логика по завершению обработки CSV файла
            fs.unlinkSync(filePath); // Удаляем временный файл после обработки
            res.json({ success: true, message: 'File uploaded and processed successfully' });
        })
        .on('error', (error) => {
            console.error('Error reading CSV:', error);
            res.status(500).json({ error: 'Internal Server Error' });
        });
});

// Роут для получения списка транзакций
app.get('/api/transactions', (req, res) => {
    const transactions = [];

    fs.createReadStream(csvFilePath)
        .pipe(csvParser({ separator: ';' }))
        .on('data', (row) => {
            transactions.push(row);
        })
        .on('end', () => {
            res.json(transactions);
        })
        .on('error', (error) => {
            console.error('Error reading CSV:', error);
            res.status(500).json({ error: 'Internal Server Error' });
        });
});

// Роут для добавления мошеннической транзакции
app.post('/api/fraud-transactions', (req, res) => {
    const fraudTransaction = req.body;

    fs.appendFile(csvFilePath, `\n${fraudTransaction.Column1};${fraudTransaction.customer};1`, (err) => {
        if (err) {
            console.error('Error appending to CSV:', err);
            res.status(500).json({ error: 'Internal Server Error' });
        } else {
            res.status(200).json({ success: true, message: 'Fraud transaction added successfully' });
        }
    });
});

let successfulTransactionCount = 0;

// Роут для добавления успешной транзакции
app.post('/api/successful-transaction', (req, res) => {
    successfulTransactionCount++;

    res.status(200).json({
        success: true,
        message: `Successful transaction added successfully. Total successful transactions: ${successfulTransactionCount}`,
    });
});

// Роут для удаления одного файла
app.post('/api/delete-file', (req, res) => {
    const filePath = req.body.filePath || csvFilePath;
    deleteFile(filePath, res);
});

// Массив для хранения файлов, которые нужно удалить
const filesToDelete = [];

// Роут для загрузки файла с асинхронной обработкой
app.post('/api/upload', upload.single('file'), async (req, res) => {
    const { file } = req;

    if (!file) {
        return res.status(400).json({ error: 'No file provided' });
    }

    const filePath = file.path;

    try {
        const transactions = [];
        
        await new Promise((resolve, reject) => {
            fs.createReadStream(filePath)
                .pipe(csvParser({ separator: ';' }))
                .on('data', (row) => {
                    transactions.push(row);
                })
                .on('end', () => {
                    resolve();
                })
                .on('error', (error) => {
                    reject(error);
                });
        });

        fs.unlinkSync(filePath); // Удаляем временный файл после обработки
        res.json({ success: true, message: 'File uploaded and processed successfully' });

        // Обновляем данные после успешной обработки файла
        updateTransactionTable(transactions);
    } catch (error) {
        console.error('Error reading or processing CSV:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Роут для удаления нескольких файлов
app.post('/api/delete-files', (req, res) => {
    try {
        // Удаляем все файлы из массива
        filesToDelete.forEach(filePath => {
            deleteFile(filePath, res);
        });

        // Очищаем массив файлов для удаления
        filesToDelete.length = 0;
    } catch (error) {
        console.error('Error deleting files:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Запуск сервера
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
    console.log('Сервер успешно запущен.');
});
