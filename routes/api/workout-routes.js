const router = require('express').Router();


const db = require("../../models");

router.get("/", (req, res) => {
  db.Workout.aggregate([
    {
        $addFields:{
            totalDuration: {$sum: "$exercises.duration"}
        }
    }
])
.then(dbWorkout => {
    res.json(dbWorkout);
}).catch(err => {
    res.json(err);
});

});

router.post("/", ({body}, res) => {
  db.Workout.create(body)
  .then(dbWorkout => {
    console.log(dbWorkout);
    res.json(dbWorkout);
  }).catch(err => {
    res.json(err);
  });
});

router.put("/:id", (req, res) => {
  id = req.params.id
  db.Workout.findOneAndUpdate({"_id": id}, {$push: {exercises: req.body} })
  .then(result => {
    res.json(result);
    })
  .catch(err => {
    res.json(err);
  })
})

router.get("/range", (req, res) => {
  db.Workout.aggregate([
    {
        $addFields:{
            totalDuration: {$sum: "$exercises.duration"}
        }
    }
])
  .then(dbWorkout => {
    res.json(dbWorkout);
  }).catch(err => {
    res.json(err);
  });
});




module.exports = router;