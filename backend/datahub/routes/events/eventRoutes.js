import express from "express";
import { createCheckoutEvent } from "../../controllers/events/createEventCheckout.js";
import { createReturnEvent } from "../../controllers/events/createEventReturn.js";

const eventRoutes = express.Router();

eventRoutes.post("/events/checkout", createCheckoutEvent);
eventRoutes.post("/events/return", createReturnEvent);

export default eventRoutes;
