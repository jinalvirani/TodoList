const joi = require('joi');

module.exports = (req,res,next) => {
    const Schema = joi.object().keys({
        TaskName: joi.string().required(),
        Status: joi.string().required(),
        CreatedTime: joi.date()
    });

    const validation = Schema.validate(req.body);
    
    if(validation.error != undefined)
    {
        res.status(422).json(validation.error.details);
    }
    else
    {
        next();
    }
}