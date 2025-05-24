import { Router } from "express";
import { getAllManagersReport } from "../controllers/reports/getAllManagersReport";
import { getCompleteManagersReport } from "../controllers/reports/getCompleteManagersReport";

const router = Router();

router.get("/all-managers", getAllManagersReport);
router.get("/complete-report", getCompleteManagersReport);

export default router;
