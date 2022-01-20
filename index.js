const express = require('express');
const app = express();
const port = 8000;
//layouts
const expressLayouts = require('express-ejs-layouts');
app.use(expressLayouts);

//Use for assets
app.use(express.static('./assets'));

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