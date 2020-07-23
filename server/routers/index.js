const express=require('express');
const userController = require('../controllers/user');
const loginController = require('../controllers/login');
const router = express.Router();
const auth = require('../middlewares/authenticate')

// router.route('/user/list')
// .get(userController.getList);
router.post('/user/login', loginController.login);
router.get('/user/refreshToken', auth.authenticate, auth.refreshToken);

router.post('/user/add', auth.authenticate, userController.uploadDP.single('dp'), userController.add);
router.get('/user/list/:id?', auth.authenticate, userController.getList);
router.post('/user/delete', auth.authenticate, userController.deleteUser);
router.get('/user/view-profile', auth.authenticate, userController.viewProfile);
router.post('/user/add-comment', auth.authenticate, userController.addComment);

module.exports = router;