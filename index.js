const express = require('express');
const app = express();
const port = 8000;

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