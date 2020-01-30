const express = require('express');

const app = express();

app.use(express.json());

const projects = [];

function checkProjectExistence(req, res, next) {
  const { id } = req.params;
  const project = projects.find(p => p.id === id);

  if (!project) {
    return res.status(400).json({ error: 'Project does not exist' });
  };
  console.log(project)
  return next();
}

function reqLogger(req, res, next) {
  console.count("Número de requisições");

  return next();
}

app.use(reqLogger);

app.get('/projects', (req, res) => {
  return res.json(projects);
});

app.post('/projects', (req, res) => {
  const { id, title } = req.body;

  projects.push({
    id,
    title,
    tasks: [],
  });

  return res.json(projects);
});

app.post('/projects/:id/tasks', checkProjectExistence, (req, res) => {
  const { id } = req.params;
  const { title } = req.body;

  const project = projects.find(p => p.id === id);

  project.tasks.push(title);

  return res.json(projects);
});

app.put('/projects/:id', checkProjectExistence, (req, res) => {
  const { id } = req.params;
  const { title } = req.body;

  const project = projects.find(p => p.id === id);

  project.title = title;

  return res.json(project);
});

app.delete('/projects/:id', checkProjectExistence, (req, res) => {
  const { id } = req.params;

  const index = projects.findIndex(p => p.id === id);

  projects.splice(index, 1);

  return res.send();
});

app.listen(3000);