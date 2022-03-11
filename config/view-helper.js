const env = require('./enviroment');
const fs = require('fs');
const { parse } = require('querystring');
const { path } = require('express/lib/application');
const { join } = require('path');
module.exports = (app) =>{
    app.locals.assetsPath = function(filepath){
        if(env.name == 'development'){
            return filepath;
        }
        return JSON.parse(fs.readFileSync(path.join(__dirname , '../public/assets/rev-manifest.json')))[filepath];
    }
}