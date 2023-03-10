const fs = require('fs');
const Tour = require('./../Modules/tourModule');
/**
 * Inside each controller we have specific functionality for each endpoint.
 * Whether it is getting all the data at once or by ID.
 * Or if we want to update (patch) the data or delete etc.
 * Each controller controls the functionlity for these for better structure
 */

const tours = JSON.parse(
    fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`));

exports.CheckID = (req, res, next, value) => {
    console.log(`Tour id is: ${value}`);

    if(req.params.id * 1 > tours.length) {
        return res.status(404).json({
            status: 'fail',
            message: 'Invalid ID'
        });
    }
    next();
};

exports.CheckBody = (req, res, next) => {
    if(!req.body.name || !req.body.price){
        return res.status(400).json({
            status: 'fail',
            message: 'Missing name or price'
        });
    }
    next();
}


exports.GetAllTours = (req, res) => {
    res.status(200).json({
        status: 'success',
        data: {
            tours
        }
    })
}

exports.GetTourByID = (req, res) => {

    const id = req.params.id * 1;
    //loop through the array and find the correct one
    const tour = tours.find(el => el.id === id);

    res.status(200).json({
        status: 'success',
        requestedAt: req.requestTime,
        data: {
            tour
        }
    })
}

exports.AddNewTour = (req, res) => {
    const newID = tours[tours.length - 1].id +1;
    const newTour = Object.assign({id: newID}, req.body);

    tours.push(newTour);
    fs.writeFile(`${__dirname}/dev-data/data/tours-simple.json`,JSON.stringify(tours) , err =>{
        res.status(201).json({
            status: 'Success',
            data: {
                tour: newTour
            }
        });

    })
}

exports.UpdateTour = (req, res) => {

    res.status(200).json({
        status: 'Success',
        data: {
            tour: '<Updated tour here...>'
        }
    });
}

exports.RemoveTour = (req, res) => {
 
    res.status(204).json({
        status: 'Success',
        data: null
    });
}
