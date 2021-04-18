const express = require("express");
const db = require("./actions-model");
const { validateActionID, validateActions } = require("../middleware/middleware");

const router = express.Router();

router.get("/", (req, res, next) => {
    db.get()
        .then((actions) => {
            res.json(actions);
        })
        .catch(next);
});

router.get("/:id", validateActionID(), (req, res) => {
    res.json(req.action);
});

router.post("/", validateActions(), (req, res, next) => {
    db.insert(req.body)
        .then((actions) => {
            res.json(actions);
        })
        .catch(next)
});

router.put("/:id", validateActions(), validateActionID(), (req, res, next) => {
    db.update(req.params.id, req.body)
        .then(action => {
            res.json(action);
        })
        .catch(next)
});

router.delete("/:id", validateActionID(), (req, res, next) => {
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
});

module.exports = router;