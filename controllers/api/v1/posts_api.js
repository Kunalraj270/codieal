module.exports.index = function (req , res) {  
    return res.json({
        message : "Lists of post",
        posts : []
    });
}