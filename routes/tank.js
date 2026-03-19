const express = require('express');
const router = express.Router();
const tankController = require('../controllers/tankController');
const ROLES_LIST = require('../config/roles_list');
const verifyRoles = require('../middleware/verifyRoles');

router.route('/edit')
    .get(tankController.getTank)
    .post(verifyRoles(ROLES_LIST.Admin, ROLES_LIST.Editor), tankController.editTank)
    



module.exports = router;