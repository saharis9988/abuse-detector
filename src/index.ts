import "./DI";
import { resolveDependency } from "./DI";
import express, { Request, Response } from "express";
import { AiService } from "./services/ai.service";
import bodyParser from "body-parser";
const app = express();
const port = 3000;

process.env["NODE_TLS_REJECT_UNAUTHORIZED"] = "0";
app.use(bodyParser.json());
app.post("/check-template", async (req: Request, res: Response) => {
  try {
    const testedTemplate = req.body.testedTemplate;
    const aiService = resolveDependency(AiService);
    const message = await aiService.getRecommendtation(testedTemplate);

    res.send(message);
  } catch (error) {
    console.error("Error getting data:" + (error as Error).message);
    throw error;
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
