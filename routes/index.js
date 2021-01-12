const 
    router = require('express').Router(),
    postController = require('../controllers/postMethodsController'),
    getController = require('../controllers/getMethodsController');

router.post('/register', postController.RegUser);
router.post('/login', postController.Login);
router.post('/check-token', postController.CheckToken);
router.get('/:id', getController.GetUserInfo);
router.get('/:id/dialogs', getController.getAllDialogs);
router.get('/:id/messages', getController.getAllDialogMessages);

module.exports = router;