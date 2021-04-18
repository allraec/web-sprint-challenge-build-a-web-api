const dbProj = require("../projects/projects-model");
const dbAct = require("../actions/actions-model");

// middleware logger to log per request made
function logger() {
    return (req, res, next) => {
        const time = new Date().toISOString();
        console.log(`${req.method} request made by ${req.ip} at ${time}`);
        next();
    }
}

// middleware to validate request body before sending to the database
function validateProject() {
    return (req, res, next) => {
        if(!req.body.name || !req.body.description){
            res.status(400).json({
                message: "Missing required name or description field."
            })
        }else{
            next();
        }
    }
}

// middleware to check if id params exists.
function validateID() {
    return (req, res, next) => {
        dbProj.get(req.params.id)
            .then(project => {
                if(project){
                    req.project = project;
                    next();
                }else{
                    res.status(404).json({
						message: "ID not found.",
					})
                }
            })
            .catch(next)
    }
}

module.exports = {
    logger,
    validateProject,
    validateID
}