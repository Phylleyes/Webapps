import  express  from "express";
import {getLikes, addLike, deleteLike} from "../controllers/like.js"

const router = express.Router()

//endpoints for getting, adding, and removing likes
router.get ("/",getLikes)

router.post ("/",addLike)

router.delete ("/",deleteLike)

export default router