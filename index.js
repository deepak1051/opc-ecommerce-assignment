import dotenv from 'dotenv';

dotenv.config();

import cors from 'cors';
import express from 'express';
import path from 'path';
import products from './mock-data.json' assert { type: 'json' };

const app = express();
app.use(express.json());
app.use(cors());
app.get('/api/products', async (req, res) => {
  try {
    res.status(200).json({ data: products });
  } catch (error) {
    return res.status(500).json({ message: 'something went wrong' });
  }
});

if (process.env.NODE_ENV === 'production') {
  const __dirname = path.resolve();
  console.log(__dirname);
  app.use(express.static(path.join(__dirname, '/client/dist')));

  app.get('*', (req, res) =>
    res.sendFile(path.resolve(__dirname, 'client', 'dist', 'index.html'))
  );
} else {
  // const __dirname = path.resolve();
  // app.use('/uploads', express.static(path.join(__dirname, '/uploads')));
  app.get('/', (req, res) => {
    res.send('API is running....');
  });
}

//Listen server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`server is running on port ${PORT}`);
});
