import express from 'express';
import Submission from '../models/Submissions.js';
import { authenticateToken } from '../middleware/auth.js';
const router = express.Router();
router.post('/submissions', authenticateToken, async (req, res) => {
    try {  
        const {problemId, code, verdict } = req.body;
        if (!verdict) {
           
            return res.status(400).json({ error: 'Verdict is required.' });
        }
        // Use the userId from req.user, which is set by the authenticateToken middleware
        const userId = req.user._id;
        
        if (!userId) {
            return res.status(401).json({ error: 'User ID is missing.' });
        }

        const newSubmission = new Submission({ userId, problemId, code, verdict });
        await newSubmission.save();
        res.status(201).json(newSubmission);
    } catch (err) {
        console.error("Submission error:", err);
        res.status(400).json({ error: err.message });
    }
});

//
router.get('/submissions/user/:userId', authenticateToken, async (req, res) => {
    try {
        const { userId } = req.params;
        if (req.user._id.toString() !== userId) {
         return res.sendStatus(403); 
        }
        const submissions = await Submission.find({ userId }).populate('problemId').exec();
        res.status(200).json(submissions);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});
export default router;
//get code by id
router.get('/:id/code', authenticateToken, async (req, res) => {
    try {
        const { id } = req.params;
        const submission = await Submission.findById(id).exec();
        
        if (!submission) {
            return res.status(404).json({ error: 'Submission not found.' });
        }

        // Ensure the user has permission to access this submission
        if (submission.userId.toString() !== req.user._id.toString()) {
            return res.sendStatus(403); // Forbidden
        }

        res.status(200).json({ code: submission.code });
    } catch (err) {
        console.error('Error fetching code:', err);
        res.status(400).json({ error: err.message });
    }
});
// In your backend router file
router.get('/submissions/:submissionId/code', authenticateToken, async (req, res) => {
    try {
        const { submissionId } = req.params;
        const submission = await Submission.findById(submissionId).exec();
        
        if (!submission) {
            return res.status(404).json({ error: 'Submission not found.' });
        }

        // Respond with the code
        res.status(200).json({ code: submission.code });
    } catch (err) {
        console.error("Error fetching code:", err);
        res.status(400).json({ error: err.message });
    }
});
