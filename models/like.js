const moongose = require('mongoose');

const likeShema = new moongose.Schema({
    user:{
        type: moongose.Schema.ObjectId
    },
    // this define the like object id of the like object
    likeable : {
        type: moongose.Schema.ObjectId,
        required: true,
        refPath:'onModel'
    },
    // this field is use to defining the type of liked object this is a dyanmic reffercne
    onModel :{
        type: String,
        required: true,
        enum: ['Post' , 'Comment']
    }
} ,{
    timestamps : true
});

const Like = moongose.model('Like' , likeShema);
module.exports = Like;