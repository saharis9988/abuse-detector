import express, { Request, Response } from "express";
import { aiService } from "./services/ai.service";

const app = express();
const port = 3000;

process.env["NODE_TLS_REJECT_UNAUTHORIZED"] = "0";

app.get("/check-template", async (req: Request, res: Response) => {
  try {
    const testedTemplate = req.body.testedTemplate;
    const message = await aiService.getRecommendtation(testedTemplate);
    res.send(message);
  } catch (error) {
    console.error("Error getting data:" + (error as Error).message);
    res.end();
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
