const router = require('express').Router();
const controller = require('./controller');
const middleWare = require('./middleware/apiRequests');


function init() {
    initUserRoutes();
}

function initUserRoutes() {
    router.post('/v1/user/login', middleWare({
        controller: controller.userController.userLogInAction,
    }));
    router.post('/v1/user/signup', middleWare({
        controller: controller.userController.userSignUpAction,
    }));
}

init();
module.exports = router;