const express = require('express');
const userController = require('./../Controllers/userController');
const router = express.Router();

/* 
* Inside each of these routers we have declared a corresponding controller that handles the 
* functionality of the route. 
* These are kept in the Controllers folder
*/

//User routes    
router
    .route('/')
    .get(userController.GetAllUsers)
    .post(userController.CreateNewUser);

router
    .route('/:id')
    .get(userController.GetUserById)
    .patch(userController.UpdateUser)
    .delete(userController.DeleteUser); 

module.exports = router;