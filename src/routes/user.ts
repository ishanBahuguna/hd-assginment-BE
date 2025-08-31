import {Router} from "express";
import { otp, signin, signup } from "../controllers/user";

const router = Router();


router.post("/signup" , signup);

router.post("/otp" , otp);

router.post("/signin" , signin);

export default router;