const mongoose = require('mongoose');

const userBoardSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true
  },
  boardNumber: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now // يضع التاريخ والوقت الحاليين تلقائيًا
  }
});

const UserBoard = mongoose.model('UserBoard', userBoardSchema);

module.exports = UserBoard;
