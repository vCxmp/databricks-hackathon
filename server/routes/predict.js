import express from 'express';
import axios from 'axios';

const router = express.Router();

router.post('/', async (req, res) => {
  try {
    const response = await axios.post(
      `${process.env.DATABRICKS_URL}/serving-endpoints/${process.env.DATABRICKS_ENDPOINT}/invocations`,
      req.body,
      {
        headers: {
          'Authorization': `Bearer ${process.env.DATABRICKS_TOKEN}`,
          'Content-Type': 'application/json',
        }
      }
    );
    res.json(response.data);
  } catch (err) {
    console.error(err.response?.data || err.message);
    res.status(500).json({ error: 'Prediction failed' });
  }
});

export default router;