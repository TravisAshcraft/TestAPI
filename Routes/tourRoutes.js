const express = require('express');
const tourController = require('./../Controllers/tourController')

const router = express.Router();

/* 
* Inside each of these routers we have declared a corresponding controller that handles the 
* functionality of the route. 
* These are kept in the Controllers folder
*/

router
    .route('/')//route of the router
    .get(tourController.GetAllTours)
    .post(tourController.AddNewTour);

router
    .route('/:id')
    .get(tourController.GetTourByID)
    .patch(tourController.UpdateTour)
    .delete(tourController.RemoveTour);    


module.exports = router;