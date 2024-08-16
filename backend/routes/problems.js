import express from 'express';
import Problem from '../models/Problem.js';

const router = express.Router();

// Create a new problem
router.post('/', async (req, res) => {
  try {
    const newProblem = new Problem(req.body);
    const savedProblem = await newProblem.save();
    res.status(201).json(savedProblem);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Get all problems
router.get('/', async (req, res) => {
  try {
    const problems = await Problem.find();
    res.json(problems);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get a single problem
router.get('/:id', async (req, res) => {
  try {
    const problem = await Problem.findById(req.params.id);
    if (problem) {
      res.json(problem);
    } else {
      res.status(404).json({ message: 'Problem not found' });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Update a problem
router.put('/:id', async (req, res) => {
  try {
    const updatedProblem = await Problem.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (updatedProblem){
      res.json(updatedProblem);
    } else {
      res.status(404).json({ message: 'Problem not found' });
    }
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});
//fetch problem
router.get('/problems/:id', async (req, res) => {
  const { id } = req.params;
  console.log(`Received ID: ${id}`); // For debugging
  try {
    const problem = await Problem.findById(id);
    if (!problem) return res.status(404).json({ message: 'Problem not found' });
    res.json(problem);
  } catch (error) {
    console.error('Database error:', error);
    res.status(500).json({ message: error.message });
  }
});
// Delete a problem
router.delete('/:id', async (req, res) => {
  try {
    const deletedProblem = await Problem.findByIdAndDelete(req.params.id);
    if (deletedProblem) {
      res.json({ message: 'Problem deleted' });
    } else {
      res.status(404).json({ message: 'Problem not found' });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;
