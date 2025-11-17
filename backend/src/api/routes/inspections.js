"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = (0, express_1.Router)();
router.post("/", async (req, res) => {
    const { images } = req.body;
    // TODO: call AI service
    // TODO: update Hydra session
    // TODO: mint CIP68 metadata
    return res.json({ status: "OK", message: "Inspection received" });
});
exports.default = router;
//# sourceMappingURL=inspections.js.map