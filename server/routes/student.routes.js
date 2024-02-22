const router = require("express").Router;
const { default: mongoose } = require("mongoose");
const Cohort = require("../models/Cohort.model.js");
const Student = require("../models/Student.model");

router.get("/api/students", (req, res) => {
  res.json(students);
});

router.get("/students", (req, res) => {
  Student.find({})
    .populate("cohort")
    .then((students) => {
      console.log("Retrieved students -> ", students);
      res.json(students);
    })
    .catch((error) => {
      console.error("Error while retrieving students ->", error);
      res.status(500).send({ error: "Failed to retrieve cohorts" });
    });
});

router.get("/students/:studentId", (req, res) => {
  const studentId = req.params.id;
  Student.findById(studentId)
    .populate("cohort")
    .then((student) => {
      console.log("Student retrieved ", student);
      res.status(200).json(student);
    })
    .catch((error) => {
      console.error("Failed to obtain", error);
      res.status(500).send({ error: "Failed" });
    });
});

router.get("/students/cohort/:cohortId", (req, res) => {
  const cohortId = req.params.cohortId;
  Student.find({ cohort: cohortId })
    .populate("cohort")
    .then((students) => {
      console.log("Students obtained: ", students);
      res.status(200).json(students);
    })
    .catch((error) => {
      console.error("Error while retrieving students", error);
      res.status(500).send({ error: "Failed" });
    });
});

router.post("/students", (req, res) => {
  Student.create({
    firstName: req.body.firstName,
    lastName: req.body.languages,
    email: req.body.email,
    phone: req.body.phone,
    linkedinUrl: req.body.linkedinUrl,
    languages: req.body.languages,
    program: req.body.program,
    background: req.body.background,
    image: req.body.image,
    cohort: req.body.image,
    projects: req.body.projects,
  })
    .then((newStudent) => {
      console.log("Student added ", newStudent);
      res.status(201).send(newStudent);
    })
    .catch((error) => {
      console.error("Error while creating the student ->", error);
      res.status(500).send({ error: "Failed to create the student" });
    });
});

router.put("/students/:studentId", (req, res) => {
  const studentId = req.params.id;
  Recipe.findByIdAndUpdate(studentId, req.body, { new: true })
    .then((updatedStudent) => {
      console.log("Student updated ", updatedStudent);
      res.status(200).json(updatedStudent);
    })
    .catch((error) => {
      console.error("Failed to update", error);
      res.status(500).send({ error: "Failed" });
    });
});

router.delete("/students/:studentId", (req, res) => {
  const studentId = req.params.id;
  Recipe.findByIdAndDelete(studentId)
    .then((result) => {
      console.log("student deleted");
      res.status(204).send();
    })
    .catch((error) => {
      console.error("failed to delete", err);
      res.status(500).send({ error: "failed" });
    });
});

module.exports = router;
