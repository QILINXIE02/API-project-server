// server.js
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import musicRoutes from './routes/musicRoutes.js';
import weatherRoutes from './routes/weatherRoutes.js';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/music', musicRoutes); // Ensure this is correctly defined
app.use('/api/weather', weatherRoutes);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
