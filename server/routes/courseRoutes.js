import express from "express";
import Course from "../models/Course.js";
const router = express.Router();

// Get all courses
router.get("/", async (req, res) => {
  const courses = await Course.find();
  res.json(courses);
});

// Create a new course
router.post("/", async (req, res) => {
  const { title, content } = req.body;
  const newCourse = new Course({ title, content });
  await newCourse.save();
  res.json(newCourse);
});

// Update a course
router.put("/:id", async (req, res) => {
  const { title, content } = req.body;
  const updatedCourse = await Course.findByIdAndUpdate(
    req.params.id,
    { title, content },
    { new: true }
  );
  res.json(updatedCourse);
});

// Delete a course
router.delete("/:id", async (req, res) => {
  await Course.findByIdAndDelete(req.params.id);
  res.json({ message: "Course deleted" });
});

export default router;
