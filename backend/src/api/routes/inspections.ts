import { Router } from "express";

const router = Router();

router.post("/", async (req, res) => {
  const { images } = req.body;

  // TODO: call AI service
  // TODO: update Hydra session
  // TODO: mint CIP68 metadata

  return res.json({ status: "OK", message: "Inspection received" });
});

export default router;
