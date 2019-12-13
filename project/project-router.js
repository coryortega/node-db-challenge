const express = require('express');
const db = require("../data/dbConfig.js");
const Project = require('./project-model.js');

const router = express.Router();

router.get('/', (req, res) => {
  Project.find()
  .then(project => {
    // res.json([project[0].id, project[0].project_name]);
    res.json(project);
  })
  .catch(err => {
    res.status(500).json({ message: 'Failed to get projects' });
  });
});

router.post('/', (req, res) => {
    const projectData = req.body;
  
    Project.add(projectData)
    .then(project => {
      res.status(201).json(project);
    })
    .catch (err => {
      res.status(500).json({ message: 'Failed to create new project' });
    });
  });

  router.get('/tasks', (req, res) => {
    Project.findTasks()
    .then(task => {
      res.json(task);
    })
    .catch(err => {
      res.status(500).json({ message: 'Failed to get task' });
    });
  });


  router.get('/resources', (req, res) => {
    Project.findResources()
    .then(resource => {
      res.json(resource);
    })
    .catch(err => {
      res.status(500).json({ message: 'Failed to get resource' });
    });
  });

  router.post('/:id/resources', (req, res) => {
    const resourceData = req.body;
    const { id } = req.params; 

    Project.findById(id)
    .then(project => {
        if (project) {
        Project.addResource(resourceData)
        .then(resource => {
            res.status(201).json(resource);
        })
        } else {
        res.status(404).json({ message: 'Could not find project with given id.' })
        }
    })
    .catch (err => {
        res.status(500).json({ message: 'Failed to create new resource' });
    });
});

router.post('/:id/tasks', (req, res) => {
    const taskData = req.body;
    const { id } = req.params; 

    Project.findById(id)
    .then(project => {
        if (project) {
        Project.addTask(taskData)
        .then(task => {
            res.status(201).json(task);
        })
        } else {
        res.status(404).json({ message: 'Could not find project with given id.' })
        }
    })
    .catch (err => {
        res.status(500).json({ message: 'Failed to create new task' });
    });
});

  module.exports = router;