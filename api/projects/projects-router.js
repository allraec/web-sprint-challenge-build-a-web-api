const express = require("express");
const db =  require("./projects-model");
const { validateProject, validateID } = require("../middleware/middleware")

const router = express.Router();

router.get("/", (req, res, next) => {
    db.get()
        .then(projects => {
            res.json(projects);
        })
        .catch(next)
});

router.get("/:id", validateID(), (req, res) => {
    res.json(req.project);
});

router.post("/", validateProject(), (req, res, next) => {
    db.insert(req.body)
        .then(project => {
            res.json(project);
        })
        .catch(next)
});

module.exports = router;