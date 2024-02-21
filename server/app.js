const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const PORT = 5005;
const cohorts = require("./cohorts.json");
const students = require("./students.json");
const mongoose = require("mongoose");

const Cohort = require("./models/Cohort.model");
const Student = require("./models/Student.model");

// STATIC DATA
// Devs Team - Import the provided files with JSON data of students and cohorts here:
// ...

// INITIALIZE EXPRESS APP - https://expressjs.com/en/4x/api.html#express
const app = express();

// MIDDLEWARE
// Research Team - Set up CORS middleware here:
// ...
app.use(express.json());
app.use(morgan("dev"));
app.use(express.static("public"));
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(
  cors({
    origin: ["http://localhost:5173"],
  })
);

mongoose
  .connect("mongodb://127.0.0.1:27017/cohort-tools-api")
  .then((x) => console.log(`Connected to Database: "${x.connections[0].name}"`))
  .catch((err) => console.error("Error connecting to Mongodb", err));

// ROUTES - https://expressjs.com/en/starter/basic-routing.html
// Devs Team - Start working on the routes here:
// ...
app.get("/docs", (req, res) => {
  res.sendFile(__dirname + "/views/docs.html");
});

app.get("/api/cohorts", (req, res) => {
  res.json(cohorts);
});

app.get("/api/students", (req, res) => {
  res.json(students);
});

//GET

app.get("/cohorts", (req, res) => {
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

app.get("/cohorts/:cohortId", (req, res) => {
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

app.get("/students", (req, res) => {
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

app.get("/students/:studentId", (req, res) => {
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
app.get("/students/cohort/:cohortId", (req, res) => {
  const cohortId = req.params.cohortId;
  Student.find({ cohort: cohortId })
    .then((students) => {
      console.log("Students obtained: ", students);
      res.status(200).json(students);
    })
    .catch((error) => {
      console.error("Error while retrieving students", error);
      res.status(500).send({ error: "Failed" });
    });
});

// POST

app.post("/cohorts", (req, res) => {
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

app.post("/students", (req, res) => {
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

//PUT
app.put("/cohorts/:cohortId", (req, res) => {
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

app.put("/students/:studentId", (req, res) => {
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

// DELETE
app.delete("/cohorts/:cohortId", (req, res) => {
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

app.delete("/students/:studentId", (req, res) => {
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

// START SERVER
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
