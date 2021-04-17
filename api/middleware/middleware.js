const dbProj = require("../projects/projects-model");
const dbAct = require("../actions/actions-model");

function logger() {
    return (req, res, next) => {
        const time = new Date().toISOString();
        console.log(`${req.method} request made by ${req.ip} at ${time}`);
        next();
    }
}

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

function validateID() {
    return (req, res, next) => {
        dbProj.get(req.params.id)
            .then(project => {
                if(project){
                    req.user = project;
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