const express = require('express');
const Actions = require('../helpers/actionModel')

const router = express.Router();


//Action CRUD opportation 

router.use((req, res, next) => {
    console.log('Actions router');
    next();
  })

router.get('/', (req, res) => {
    Actions.get()
    .then(action => {
      res.status(200).json(action);
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({
        message: 'Error Finding the Actions',
      });
    });
});
  
// router.post('/', (req, res) => {
//     Actions.insert(req.body)
//         .then(action => {
//             res.status(201).json(action)
//         })
//         .catch(err => {
//             res.status(500).json({
//             message: "Failed to create"
//         })
//     })
//     })

router.post('/', validateAction, (req, res) => {
    Actions.insert(req.body)
    .then(action => {
      res.status(201).json(action);
    })
    .catch(err => {
      res.status(500).json({message: "Error Adding an Action", err});
    })
});

router.put('/:id', validateActionId, validateAction, (req, res) => {
    Actions.update(req.params.id, req.body)
  .then(action => {
    res.status(200).json(`Action ${action.notes} Updated`);
  })
  .catch(error => {
    console.log(error);
    res.status(500).json({message: 'Error updating action'})
  })
})

router.delete('/:id', validateActionId, (req, res) => {
    Actions.remove(req.params.id)
    .then(count => {
    res.status(200).json({ message: `${count} account deleted`})
  })
  .catch(error => {
    console.log(error);
    res.status(500).json({
      message: 'Error removing the action',
    });
  });
})

//Functions for our Router Middleware Below 


function validateActionId(req, res, next) {
    const { id } = req.params;
    Actions.get(id)
    .then(action => {
      if(action) {
        next(); 
      } else {
        next({code: 400, message: "Invalid action ID"}); 
      }
    })
    .catch(err => {
      console.log(err);
      next({code: 500, message: "Failed to process request", err});
    })
  }
  
 
  function validateAction(req, res, next) {
    if(req.body) {
      if(req.body.notes && req.body.description) {
        const action = {...req.body, project_id: req.params.id};
        req.action = action;
        next();
      } else {
        next({code: 400, message: "Missing required notes field"});
      }
    } else {
      next({code: 400, message: "Missing action data"});
    }
}
module.exports = router; 