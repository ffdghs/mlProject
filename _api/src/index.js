import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import productsController from './controllers/productsController';

dotenv.config();

const {
  PORT,
} = process.env;

const app = express();

app.use(express.json());
app.use(cors());

app.listen(PORT, () => {
  console.log(`App started and listening on port : ${PORT}`);
});

app.post(
  '/products',
  productsController.getProducts.bind(productsController),
);
