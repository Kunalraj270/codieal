const express = require('express');
//cookies parser
const cookieParser = require('cookie-parser');
const app = express();
const port = 8000;
const expressLayouts = require('express-ejs-layouts');
//import db
const db = require('./config/mongoose');

app.use(express.urlencoded({extended:true}));
app.use(cookieParser());


//Use for assets
app.use(express.static('./assets'));
//layouts
app.use(expressLayouts);


//extract style and script from sub page into layout
app.set('layout extractStyles' , true);
app.set('layout extractScripts' , true);

//Use express router
app.use('/',require('./routes/index'));

//set up the view engine

app.set('view engine' , 'ejs');
app.set('views' , './views');









app.listen(port , function(err){
    if(err){
        // console.log('error' , err)
        //Interpolation
        console.log(`Error is running in server: ${err}`);
    }
    console.log(`Server is running on port: ${port}`);
});