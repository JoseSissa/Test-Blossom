import * as express from "express";
import expressRouter from "./router";

import { loggerAdapter } from "../../config/DependencyInjection";

async function init() {
    await loggerAdapter.init();
}
init();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(expressRouter);

app.listen(PORT, () => {
    console.log(`Server running on port: http://localhost:3000`);
});