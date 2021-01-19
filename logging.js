
 
let logger  ={ logValue :  function (req,res, next) {

    console.log('Logging');

    next();
}
}

 exports.log = logger;