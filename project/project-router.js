const express = require('express');
const db = require("../data/dbConfig.js");
const Project = require('./project-model.js');

const router = express.Router();

router.get('/', (req, res) => {
  Project.find()
  .then(project => {
    project.forEach(e => {if(e.completed === 0){
        res.json([{completed: false, id:e.id, project_name: e.project_name, project_description: e.project_description}])
    } else {
        res.json([{completed: true, id:e.id, project_name: e.project_name, project_description: e.project_description}])
    }})
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
    // .then(task => {
    //   res.json(task);
    // })
    .then(task => {
        task.forEach(e => {if(e.task_completed === 0){
            res.json([{task_completed: false, project_name: e.project_name, project_description: e.project_description, task_notes: e.task_notes, task_description: e.task_description}])
        } else {
            res.json([{task_completed: true, project_name: e.project_name, project_description: e.project_description, task_notes: e.task_notes, task_description: e.task_description}])
        }})
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