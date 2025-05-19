import * as express from "express";
import expressRouter from "./router";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(expressRouter);

app.listen(PORT, () => {
    console.log(`Server running on port: http://localhost:3000`);
});