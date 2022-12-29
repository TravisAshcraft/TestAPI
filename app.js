const express = require('express');
const fs = require('fs');
const morgan = require('morgan');

const app = express();

//#region Middleware

//Third-Party Middleware
app.use(morgan('dev'));

//Adding middleware from express 
app.use(express.json());

//Adding custom middleware
//Depending when we call this function will determine its execution.
//Each route handler ends the execution stack so if this is after them it will not be called!
app.use((req, res, next) => {
    console.log('Hello from the middleware');
    next();
})

//Adding timestamp to middleware
app.use((req, res, next) => {
    req.requestTime = new Date().toISOString();
    next();
})
//#endregion Middleware


const tours = JSON.parse(
    fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`));

//#region RouteHandlers

const GetAllTours = (req, res) => {
    res.status(200).json({
        status: 'success',
        results: tours.length,
        data: {
            tours
        }
    })
}

const GetTourByID = (req, res) => {

    const id = req.params.id * 1;
    //loop through the array and find the correct one
    const tour = tours.find(el => el.id === id);

    if(!tour) {
        return res.status(404).json({
            status: 'fail',
            message: 'Invalid ID'
        });
    }
    

    res.status(200).json({
        status: 'success',
        requestedAt: req.requestTime,
        data: {
            tour
        }
    })
}

const AddNewTour = (req, res) => {
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

const UpdateTour = (req, res) => {

    if(req.params.id * 1 > tours.length) {
        return res.status(404).json({
            status: 'fail',
            message: 'Invalid ID'
        });
    }
    
    res.status(200).json({
        status: 'Success',
        data: {
            tour: '<Updated tour here...>'
        }
    });
}

const RemoveTour = (req, res) => {

    if(req.params.id * 1 > tours.length) {
        return res.status(404).json({
            status: 'fail',
            message: 'Invalid ID'
        });
    }
    
    res.status(204).json({
        status: 'Success',
        data: null
    });
}
//#endregion RouteHandlers

//#region Routes

//Instead of doing each route individually like this here we can group them together.
//app.get('/api/v1/tours', GetAllTours);
//app.post('/api/v1/tours', AddNewTour);
//app.get('/api/v1/tours/:id', GetTourByID);
//app.patch('/api/v1/tours/:id', UpdateTour);
//app.delete('/api/v1/tours/:id', RemoveTour);

//Like here since GetAllTours and AddNewTour share the same route they can be grouped together.
app
    .route('/api/v1/tours')
    .get(GetAllTours)
    .post(AddNewTour);

app
    .route('/api/v1/tours/:id')
    .get(GetTourByID)
    .patch(UpdateTour)
    .delete(RemoveTour);    

//#endregion Routes

//#region Server   
const port = 3000;
app.listen(port, () => {
    console.log('App running on port ${port}....');
});
//#endregion