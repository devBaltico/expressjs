const express = require('express');
const morgan = require('morgan');
const app = express();

function logger(req, res, next){
  console.log(`Route recibido: ${req.protocol}://${req.get('host')}${req.originalUrl}`);
  next();
  
}

// Settings
app.set('appName', 'Baltico Dev');
//app.set('PORT', 3000);
app.set('view engine', 'ejs');

// Middlewares
app.use(express.json());
//app.use(logger);
app.use(morgan('dev'));


const PORT = process.env.PORT || 5000;

// Routes
/*app.all('/user', (req, res, next) => {
    console.log('Por aqui paso');
    next();
   });*/

app.get('/', (req, res) => {
  const data = [{name: 'Luis'}, {name: 'Maria'}, {name: 'Pedro'}];
  res.render('index.ejs', {people: data});
})

app.get('/user', (req, res)=>{
    res.json({
        username: 'Cameron',
        lastname: 'Haward',
    });
});

app.post('/user/:id', (req, res) => {
    console.log(req.body);
    console.log(req.params);
    res.send('Peticion POST REQUEST recibida')
})

app.put('/user/:id', (req, res) => {
    console.log(req.body);
    
  res.send(`Usuario ${req.params.id} update`);
});

app.delete('/user/:Id', (req, res) => {
  res.send(`User ${req.params.userId} deleted`);
});

app.use(express.static('public'));

app.listen(PORT, () => {
  console.log(app.get('appName'));
  console.log(`Example app listening at http://localhost:${PORT}`);
});

