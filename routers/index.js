const express=require('express');
const userController = require('../controllers/user');
const router = express.Router();
const auth = require('../middlewares/authenticate')

// router.route('/user/list')
// .get(userController.getList);

router.post('/user/add', auth, userController.uploadDP.single('dp'), userController.add);
router.get('/user/list/:id?', auth,userController.getList);
router.post('/user/delete', userController.deleteUser);
router.post('/user/login', userController.login);

module.exports = router;