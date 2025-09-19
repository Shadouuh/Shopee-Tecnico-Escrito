import express from "express";
import cors from "cors";
import productRouter from "./routes/product.routes";

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(cors());
app.use("/api/products", productRouter);

app.listen(PORT, () => {
  console.log(`Se Prendio el Server en: http://localhost:${PORT} :D`);
});
