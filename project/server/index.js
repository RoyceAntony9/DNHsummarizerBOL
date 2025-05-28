import express from 'express';
import { PythonShell } from 'python-shell';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const port = 3000;

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

app.get('/api/summarize', async (req, res) => {
  try {
    const options = {
      scriptPath: join(__dirname, 'python'),
      pythonPath: 'python3'
    };

    PythonShell.run('summarizer.py', options).then(messages => {
      const result = JSON.parse(messages[messages.length - 1]);
      res.json(result);
    }).catch(err => {
      console.error('Python script error:', err);
      res.status(500).json({ error: 'Failed to process news' });
    });
  } catch (error) {
    console.error('Server error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});