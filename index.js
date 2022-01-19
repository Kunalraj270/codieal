const express = require('express');
const app = express();
const port = 8000;

//Use express router
app.use('/',require('./routes/index'));




app.listen(port , function(err){
    if(err){
        // console.log('error' , err)
        //Interpolation
        console.log(`Error is running in server: ${err}`);
    }
    console.log(`Server is running on port: ${port}`);
});