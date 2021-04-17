const express = require("express");
const db =  require("./projects-model");

const router = express.Router();

router.get("/", (req, res, next) => {
    db.get()
        .then(projects => {
            res.json(projects);
        })
        .catch(next)
});

router.get("/:id", (req, res, next) => {
    db.get(req.params.id)
        .then(project => {
            res.json(project);
        })
        .catch(next)
})

module.exports = router;