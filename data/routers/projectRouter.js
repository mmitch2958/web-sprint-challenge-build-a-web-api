
const express = require('express');
const Project = require('../helpers/projectModel')
const router = express.Router();


//Project CRUD Opporators 

router.use((req, res, next) => {
    console.log('Project Router');
    next();
})



router.get('/', (req, res) => {
    Project.get()
    .then(user => {
      res.status(200).json(user);
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({
        message: 'Error Finding Project',
      });
    });
  });

router.get('/:id', validateProjectId, (req, res) => {
    Project.getProjectActions(req.params.id)
    .then(actions => {
    res.status(200).json(actions)
  })
  .catch(error => {
    console.log(error);
    res.status(500).json({
      message: 'Error Finding Project by id',
    });
  });
})


router.post('/', validateProject, (req, res) => {
    Project.insert(req.body)
    .then(project => {
      res.status(201).json(project);
    })
    .catch(err => {
      res.status(500).json({message: "Error adding a project", err});
    })
});

router.put('/:id', validateProjectId, validateProject, (req, res) => {
    Project.update(req.params.id, req.body)
  .then(project => {
    res.status(200).json(`Project ${project.name} Updated`);
  })
  .catch(error => {
    console.log(error);
    res.status(500).json({message: 'Error updating project'})
  })
})

router.delete('/:id', validateProjectId, (req, res) => {
    Project.remove(req.params.id)
    .then(count => {
    res.status(200).json({ message: `${count} account deleted: ${req.project.name}`})
  })
  .catch(error => {
    console.log(error);
    res.status(500).json({
      message: 'Error removing the project',
    });
  });
})


//Projct Middlware Functions 

function validateProjectId(req, res, next) {
    const { id } = req.params;
    Project.get(id)
    .then(project => {
      if(project) {
        req.project = project;
        next(); 
      } else {
        next({code: 400, message: "Invalid user ID"}); 
      }
    })
    .catch(err => {
      console.log(err);
      next({code: 500, message: "Failed to process request", err});
    })
  }
  

  function validateProject(req, res, next) {
   
    if(req.body) {
      if(req.body.name && req.body.description) {
        next();
      } else {
        next({code: 400, message: "Missing required name field"});
      }
    } else {
      next({code: 400, message: "Missing user data", user: req.body});
    }
  }
  

module.exports = router;
