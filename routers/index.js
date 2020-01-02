const express=require('express');
const userController = require('../controllers/user');
const loginController = require('../controllers/login');
const router = express.Router();
const auth = require('../middlewares/authenticate')

// router.route('/user/list')
// .get(userController.getList);
router.post('/user/login', loginController.login);

router.post('/user/add', auth, userController.uploadDP.single('dp'), userController.add);
router.get('/user/list/:id?', auth,userController.getList);
router.post('/user/delete', userController.deleteUser);

module.exports = router;