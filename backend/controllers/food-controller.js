const Food = require("../models/food-model");

exports.createFood = (req, res, next) => {
  // const url = req.protocol + "://" + req.get("host");
  console.log("createFood backend hit" + req.body.name + req.body.category);
  const food = new Food({
    category: req.body.category,
    type: req.body.type,
    name: req.body.name,
    carbs: req.body.carbs,
    protein: req.body.protein,
    fat: req.body.fat,
    kCals: req.body.kCals,
    serving: req.body.serving,
    measurement: req.body.measurement,
    exchanges: req.body.exchanges
  });
  food
    .save()
    .then(createdFood => {
      res.status(201).json({
        message: "Food added successfully!",
        food: {
          ...createdFood,
          id: createdFood._id
        }
      });
    })
    .catch(error => {
      return res.status(500).json({
        message: "Creating a food failed!",
        error: error
      });
    });
};

exports.updateFood = (req, res, next) => {
  const food = new Food({
    _id: req.body.id,
    category: req.body.category,
    type: req.body.type,
    name: req.body.name,
    carbs: req.body.carbs,
    protein: req.body.protein,
    fat: req.body.fat,
    kCals: req.body.kCals,
    serving: req.body.serving,
    measurement: req.body.measurement,
    exchanges: req.body.exchanges
  });
  Food.updateOne({ _id: req.params.id }, food)
    .then(result => {
      if (result.n > 0) {
        res.status(200).json({ message: "Food Updated successfully!" });
      } else {
        res.status(401).json({ message: "Not Authorized!" });
      }
    })
    .catch(error => {
      res.status(500).json({
        message: "Couldn't update food!"
      });
    });
};

exports.getFoods = (req, res, next) => {
  let fetchedFoods;
  const foodQuery = Food.find();
  foodQuery
    .then(documents => {
      fetchedFoods = documents;
      return Food.count();
    })
    .then(count => {
      res.status(200).json({
        message: "Foods fetched successfully!",
        foods: fetchedFoods,
        maxFoods: count
      });
    })
    .catch(error => {
      res.status(500).json({
        message: "Fetching foods failed!"
      });
    });
};



exports.getFood = (req, res, next) => {
  Food.findById(req.params.id)
    .then(food => {
      if (food) {
        res.status(200).json(food);
      } else {
        res.status(404).json({ message: "Food not found!" });
      }
    })
    .catch(error => {
      res.status(500).json({
        message: "Fetching food failed!"
      });
    });
};

// exports.getFood = (req, res, next) => {
//   Food.find(req.params.name)
//     .then(food => {
//       if (food) {
//         res.status(200).json(food);
//       } else {
//         res.status(404).json({ message: "Food not found!" });
//       }
//     })
//     .catch(error => {
//       res.status(500).json({
//         message: "Fetching food failed!"
//       });
//     });
// };


exports.deleteFood = (req, res, next) => {
  Food.deleteOne({ _id: req.params.id })
    .then(result => {
      console.log("result = " + result);
      if (result.n > 0) {
        res.status(200).json({ message: "Food deleted!" });
      } else {
        res.status(401).json({ message: "Not Authorized!" });
      }
    })
    .catch(error => {
      res.status(500).json({
        message: "Deleting food failed!"
      });
    });
};
