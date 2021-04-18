const express = require("express");
const db =  require("./projects-model");
const { validateProject, validateID } = require("../middleware/middleware")

const router = express.Router();

// get request that displays the array of projects

router.get("/", (req, res, next) => {
    db.get()
        .then(projects => {
            res.json(projects);
        })
        .catch(next)
});

// get request that displays the project of the specified id
router.get("/:id", validateID(), (req, res) => {
    res.json(req.project);
});

// post request that adds a project to the database
router.post("/", validateProject(), (req, res, next) => {
    db.insert(req.body)
        .then(project => {
            res.json(project);
        })
        .catch(next)
});

// put request that updates an id specified
router.put("/:id", validateProject(), validateID(), (req, res, next) => {
    db.update(req.params.id, req.body)
        .then(project => {
            res.json(project);
        })
        .catch(next)

});

// delete request that removes a specified id
router.delete("/:id", validateID(), (req, res, next) => {
    db.remove(req.params.id)
        .then((count) => {
            if(count > 0){
                res.status(200).json({
                    message: "Item deleted."
                });
            }else{
                next();
            }
        })
        .catch(next)
})
module.exports = router;