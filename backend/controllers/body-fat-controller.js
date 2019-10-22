const BodyFat = require("../models/body-fat-model");

exports.createBodyFat = (req, res, next) => {
  console.log("createBodyFat backend hit " + req.body.date + req.body.weight);
  const bodyFat = new BodyFat({
    date: req.body.date,
    weight: req.body.weight,
    weightChange: req.body.weight,
    fatPercent: req.body.fatPercent,
    percentChange: req.body.percentChange,
    fatMass: req.body.fatMass,
    fatChange: req.body.fatChange,
    leanMass: req.body.leanMass,
    leanChange: req.body.leanChange
  });
  bodyFat
    .save()
    .then(createdBodyFat => {
      res.status(201).json({
        message: "BodyFat added successfully!",
        bodyFat: {
          ...createdBodyFat,
          id: createdBodyFat._id
        }
      });
    })
    .catch(error => {
      return res.status(500).json({
        message: "Creating new bodyfat failed!",
        error: error
      });
    });
};

exports.updateBodyFat = (req, res, next) => {
  const bodyFat = new BodyFat({
    _id: req.body.id,
    date: req.body.date,
    weight: req.body.weight,
    weightChange: req.body.weight,
    fatPercent: req.body.fatPercent,
    percentChange: req.body.percentChange,
    fatMass: req.body.fatMass,
    fatChange: req.body.fatChange,
    leanMass: req.body.leanMass,
    leanChange: req.body.leanChange
  });
  BodyFat.updateOne({ _id: req.params.id }, food)
    .then(result => {
      if (result.n > 0) {
        res.status(200).json({ message: "BodyFat Updated successfully!" });
      } else {
        res.status(401).json({ message: "Not Authorized!" });
      }
    })
    .catch(error => {
      res.status(500).json({
        message: "Couldn't update bodyfat!"
      });
    });
};

exports.getBodyFats = (req, res, next) => {
  let fetchedBodyFats;
  const bodyFatQuery = BodyFat.find();
  bodyFatQuery
    .then(documents => {
      fetchedBodyFats = documents;
      return BodyFat.count();
    })
    .then(count => {
      res.status(200).json({
        message: "BodyFats fetched successfully!",
        bodyFats: fetchedBodyFats,
        maxBodyFats: count
      });
    })
    .catch(error => {
      res.status(500).json({
        message: "Fetching foods failed!"
      });
    });
};

exports.getBodyFat = (req, res, next) => {
  BodyFat.findById(req.params.id)
    .then(bodyFat => {
      if (bodyFat) {
        res.status(200).json(bodyFat);
      } else {
        res.status(404).json({ message: "BodyFat not found!" });
      }
    })
    .catch(error => {
      res.status(500).json({
        message: "Fetching bodyFat failed!"
      });
    });
};

exports.deleteBodyFat = (req, res, next) => {
  BodyFat.deleteOne({ _id: req.params.id })
    .then(result => {
      console.log("Delete bodyfat result = " + result);
      if (result.n > 0) {
        res.status(200).json({ message: "BodyFat deleted!" });
      } else {
        res.status(401).json({ message: "BodyFat Not Authorized!" });
      }
    })
    .catch(error => {
      res.status(500).json({
        message: "Deleting bodyFat failed!"
      });
    });
};
