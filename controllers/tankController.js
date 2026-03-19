const tank = require('../model/tank');
const editTank = (req, res) => {
    res.status(200).json({ "message": "Tank edit request received successfully!" });
}
module.exports = {editTank};