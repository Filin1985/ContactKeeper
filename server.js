// Фреймворк для серверной части сайта на базе Node.js
const express = require('express');
const connectDB = require('./config/db');

const app = express();

// Подключаем базу данных
connectDB();

// Запускаем middleware
app.use(express.json({ extended: false }));


// Определяем пути
app.use('/api/users', require('./routes/users'));
app.use('/api/auth', require('./routes/auth'));
app.use('/api/contacts', require('./routes/contacts'));

// Serve static assets in production
if (process.env.NODE_ENV === 'production') {
    // Set static folder
    app.use(express.static('client/build'));

    app.get('*', (req, res) => res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html')));
}


// Настраиваем порт, в одном случае если удут запускать уже готовый сайт и в другом локальный для разработки
const PORT = process.env.PORT || 5000;

app.listen(PORT , () => console.log(`Server started on port ${PORT}`));
