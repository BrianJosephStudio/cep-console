import { Request, Response, Router } from "express";
import { IOSocket } from "../../util/socket";

const router = Router();

router.post("/log", (req: Request, res: Response) => {
  try {
    const { io } = IOSocket.getInstance();
    const { identifier, log } = req.body;

    io.to(identifier).emit("log", log);

    res.status(200).send("Text sent to client");
  } catch (e) {
    res.status(500).send("Unhandled Server Error");
  }
});

router.post("/clear", (req: Request, res: Response) => {
  try {
    const { io } = IOSocket.getInstance();
    const { identifier } = req.body;

    io.to(identifier).emit("clear");

    res.status(200).send("Clear executed!");
  } catch (e) {
    res.status(500).send("Unhandled Server Error");
  }
});

export default router;
