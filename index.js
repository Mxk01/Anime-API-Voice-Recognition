let express = require('express');
let app = express();
let port = process.env.PORT || 3000;
let dotenv = require('dotenv');
let animeRoute = require('./routes/anime');
dotenv.config();

app.get('/',(req,res)=>res.redirect('/anime'));

app.use(express.static('public'));
app.set('view engine','ejs');
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use('/anime',animeRoute);

app.listen(port,()=>console.log('Connecting to the server ... '));
