function log(req,res,next){
    
    console.log('Logging');
//Logic    
    next();
}

module.exports = log;