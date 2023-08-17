const express = require("express");
const router = express.Router();

const { PlanModel } = require("../models/plan");

// Create a new plan
router.post("/plan", async (req, res) => {
  const{ name, email,destination,travelers,budget} = req.body;
  try {
    const plan = new PlanModel({ name, email,destination,travelers,budget});
    await plan.save();
    res.status(201).json(plan);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Failed to create plan" });
  }
});

// Get all plans
router.get("/plan", async (req, res) => {
  try {
    const plans = await PlanModel.find();
    res.status(200).json(plans);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Failed to retrieve plans" });
  }
});


router.get("/plan/asc", async (req, res) => {
  try {
    const plans = await PlanModel.find().sort({ budget: 1 });
    res.status(200).json(plans);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Failed to retrieve sorted plans" });
  }
});

// Get plans sorted by price in descending order
router.get("/plan/desc", async (req, res) => {
  try {
    const plans = await PlanModel.find().sort({ budget: -1 });
    res.status(200).json(plans);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Failed to retrieve sorted plans" });
  }
});

// Get plans filtered by author
router.get("/plan/destination/:destination", async (req, res) => {
  const { destination } = req.params;
  try {
    const plans = await PlanModel.find({ destination: destination });
    res.status(200).json(plans);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Failed to retrieve filtered plans" });
  }
});

// Delete a plan by ID
router.delete("/plan/:id", async (req, res) => {
  const { id } = req.params;
  try {
    await PlanModel.findByIdAndDelete(id);
    res.status(200).json({ message: "plan deleted successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Failed to delete plan" });
  }
});

module.exports ={router};
