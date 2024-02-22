const router = require("express").Router;
const { default: mongoose } = require("mongoose");
const Cohort = require("../models/Cohort.model.js");
const Student = require("../models/Student.model");

router.get("/api/cohorts", (req, res) => {
  res.json(cohorts);
});

router.get("/cohorts", (req, res) => {
  Cohort.find({})
    .then((cohorts) => {
      console.log("Retrieved cohorts ->", cohorts);
      res.json(cohorts);
    })
    .catch((error) => {
      console.error("Error while retrieving cohorts ->", error);
      res.status(500).send({ error: "Failed to retrieve cohorts" });
    });
});

router.get("/cohorts/:cohortId", (req, res) => {
  const cohortId = req.params.id;
  Cohort.findById(cohortId)
    .then((cohort) => {
      console.log("Cohort obtained ", cohort);
      res.status(200).json(cohort);
    })
    .catch((error) => {
      console.error("Failed to obtain", error);
      res.status(500).send({ error: "Failed" });
    });
});

router.post("/cohorts", (req, res) => {
  Cohort.create({
    cohortSlug: req.body.cohortSlug,
    cohortName: req.body.cohortId,
    program: req.body.program,
    format: req.body.format,
    campus: req.body.campus,
    startDate: req.body.startDate,
    endDate: req.body.endDate,
    inProgress: req.body.inProgress,
    programManager: req.body.programManager,
    leadTeacher: req.body.leadTeacher,
    totalHours: req.body.totalHours,
  })
    .then((newCohort) => {
      console.log("Recipe added ", newCohort);
      res.status(201).send(newCohort);
    })
    .catch((error) => {
      console.error("Error while creating the cohort ->", error);
      res.status(500).send({ error: "Failed to create the cohort" });
    });
});

router.put("/cohorts/:cohortId", (req, res) => {
  const cohortId = req.params.id;
  Cohort.findByIdAndUpdate(cohortId, req.body, { new: true })
    .then((updatedCohort) => {
      console.log("Cohort updated ", updatedCohort);
      res.status(200).json(updatedCohort);
    })
    .catch((error) => {
      console.error("Failed to update", error);
      res.status(500).send({ error: "Failed" });
    });
});

router.delete("/cohorts/:cohortId", (req, res) => {
  const cohortId = req.params.id;
  Recipe.findByIdAndDelete(cohortId)
    .then((result) => {
      console.log("cohort deleted");
      res.status(204).send();
    })
    .catch((error) => {
      console.error("failed to delete", err);
      res.status(500).send({ error: "failed" });
    });
});

module.exports = router;
