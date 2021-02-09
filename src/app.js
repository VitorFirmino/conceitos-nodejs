const express = require('express');
const cors = require('cors');

const { v4: uuid } = require('uuid');

const app = express();

app.use(cors());
app.use(express.json());

const pages = [];

app.get('/pages', (request, response) => {
  return response.json(pages)
});

app.post('/pages', (request, response) => {
  const { name, title, andress, city} = request.body;

  const page = {id: uuid(), name, title, andress, city, likes:0 };

  pages.push(page);

  return response.json(page);
})

app.post('/pages/:id/likes', (request, response) => {
  const { id } = request.params;

  const pageIndex = pages.findIndex(page => page.id === id )
  if(pageIndex < 0 ){
    return response.status(400).json({messege: 'pages that does not exist'})
  };

  pages[pageIndex].likes += 1;

  return response.json(pages[pageIndex])

});

app.put('/pages/:id', (request, response) => {
  const { id } = request.params;
  const { name, title, andress, city} = request.body;

  const pageIndex = pages.findIndex(page => page.id === id)
  if(pageIndex < 0) {
    return response.status(400).json({messege: 'pages that does not exist'})
  };

  const page = {
    id,
    name,
    title,
    andress,
    city,
    likes: pages[pageIndex].likes
  };

  pages[pageIndex] = page;

  return response.json(page);
})

app.delete('/pages/:id', (request, response) => {
  const { id } = request.params;

  const pageIndex = pages.findIndex(page => page.id === id)
  if(pageIndex < 0) {
    return response.stauts(400).json({messege: 'pages that does not exist'})
  };

  pages.splice(pageIndex, 1);

  return response.status(204).send();
})



module.exports = app;