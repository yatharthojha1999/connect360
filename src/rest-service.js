const router = require('express').Router();
const controller = require('./controller');
const middleWare = require('./middleware/apiRequests');


function init() {
    initUserRoutes();
}

function initUserRoutes() {
    // get user-by-ids route.
    router.get('/v1/users/get-user-by-ids', middleWare({
        controller: controller.userController.getUserDetailsByIdsAction,
    }));
    // get active users list.
    router.get('/v1/user/active-users', middleWare({
        controller: controller.userController.getActiveUsersAction,
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
        controller: controller.userController.addNewUserAction,
    }));
    // delete existing user route.
    router.patch('/v1/user/deactivate-user/:userId', middleWare({
        controller: controller.userController.deactivateUserAction,
    }));
    // get deactive users list.
    router.get('/v1/user/deactive-users', middleWare({
        controller: controller.userController,
    }));
    // get user-by-id route.
    router.get('/v1/user/:userId', middleWare({
        controller: controller.userController.getUserDetailsByIdAction,
    }));
}

init();
module.exports = router;