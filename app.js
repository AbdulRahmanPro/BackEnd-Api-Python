require('dotenv').config();
const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const mongoose = require('mongoose');
const indexRouter = require('./routes/index');
const cors = require('cors');
const app = express();
const port = 3000;
var mongoDbUri = 'mongodb+srv://database.2bchr9o.mongodb.net/?retryWrites=true&w=majority';

mongoose
  .connect(mongoDbUri, {
    user: 'Saifi2008',
    pass: 'XagNZlt2OnJ4PQCc',
  })
  .then(() => {
    console.log('Connected to MongoDB');
    app.listen(port, () => {
      console.log(`app is listening on port ${port}`);
    });
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error);
  });
app.use(cors());
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.get('/', (req, res) => {
  res.send('Server is running now');
});
app.use('/auth', indexRouter);
// التعامل مع الأخطاء 404
app.use(function (req, res, next) {
  next(createError(404));
});

app.use(function (err, req, res, next) {
  // تعيين رسالة الخطأ والمعلومات في الوسيطات المحلية للصفحة
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // عرض صفحة الخطأ أو إرسال استجابة JSON بناءً على احتياجاتك
  res.status(err.status || 500);

  // إذا كنت ترغب في عرض صفحة HTML للخطأ:
  res.render('error'); // يجب التأكد من وجود ملف "error.ejs" في مجلد العرض


});

module.exports = app;
