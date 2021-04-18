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
function validateProjectID() {
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

// middleware to check if id params exists.
function validateActionID() {
    return (req, res, next) => {
        dbAct.get(req.params.id)
            .then(action => {
                if(action){
                    req.action = action;
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

// middleware to validate request body before sending to the database
function validateActions() {
    return (req, res, next) => {
        if(!req.body.project_id || !req.body.description || !req.body.notes){
            res.status(400).json({
                message: "Missing required project id, description or notes field."
            });
        }else{
            if(req.body.description.length > 128){
                res.status(400).json({
                    message: "Description needs to be 128 characters or less."
                })
            }else{
                next();
            }
        }
    }
}

module.exports = {
    logger,
    validateProject,
    validateProjectID,
    validateActionID,
    validateActions
}