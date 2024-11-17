const router = require('express').Router();
const controller = require('./controller');
const middleWare = require('./middleware/apiRequests');


function init() {
    initUserRoutes();
}

function initUserRoutes() {
    // get active users list.
    router.get('/v1/active-users', middleWare({
        controller: controller.userController,
    }));
    //use this route on user login for specific link.
    router.post('/v1/user/login', middleWare({
        controller: controller.userController.userLogInAction,
    }));
    // use this route for creating new link, no new user will be created on this link from here.
    router.post('/v1/user/signup', middleWare({
        controller: controller.userController.userSignUpAction,
    }));
    // add user route.
    router.post('/v1/user/add-user', middleWare({
        controller: controller.userController,
    }));
    // delete existing user route.
    router.delete('/v1/user/delete-user/:userId', middleWare({
        controller: controller.userController,
    }));
    // get user-by-id route.
    router.get('/v1/user/:userId', middleWare({
        controller: controller.userController,
    }));
    // get user-by-ids route.
    router.get('/v1/user/userIds', middleWare({
        controller: controller.userController,
    }));
    // get deactive users list.
    router.get('/v1/deactive-users', middleWare({
        controller: controller.userController,
    }));
}

init();
module.exports = router;