const UserBoard = require('../models/user');

const checkBoardNumber = async (req, res) => {
  const { boardNumber } = req.body;
  try {
    const boardExists = await UserBoard.findOne({ boardNumber });
    if (boardExists) {
        res.status(201).json({message:'رقم اللوحة صالح.' , status:true});
    } else {
        res.status(400).json({message:'رقم اللوحة غير موجود .' , status:false});
    }
  } catch (error) {
    console.error(error);
    res.status(500).send('حدث خطأ أثناء التحقق من رقم اللوحة.');
  }
};

const addUser = async (req, res) => {
  const { username, boardNumber } = req.body;
  try {
    const boardExists = await UserBoard.findOne({ boardNumber });
    if (boardExists) {
      res.json({ success: false, message: 'رقم اللوحة موجود بالفعل.' });
    } else {
      const newUser = new UserBoard({ username, boardNumber });
      await newUser.save();
      res.json({ success: true, message: 'تم إضافة المستخدم بنجاح.' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'حدث خطأ أثناء إضافة المستخدم.' });
  }
};

module.exports = { checkBoardNumber, addUser };
