import express from 'express';
import { NumberService } from '../services/NumberService';

const app = express();
const port = 9876;
const numberService = new NumberService();

app.get('/numbers/:numberid', async (req, res) => {
  try {
    const { numberid } = req.params;
    if (!['p', 'f', 'e', 'r'].includes(numberid)) {
      return res.status(400).json({ error: 'Invalid number type' });
    }

    const result = await numberService.processNumbers(numberid);
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
