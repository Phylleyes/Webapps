import  express  from "express";
import {getRelationships, addRelationship, deleteRelationship} from "../controllers/relationship.js"

const router = express.Router()

//endpoints for getting, adding, and removing likes
router.get ("/",getRelationships)

router.post ("/",addRelationship)

router.delete ("/",deleteRelationship)

export default router