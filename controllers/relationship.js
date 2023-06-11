import {db} from "../connect.js";
import jwt from "jsonwebtoken";

//handles getting the likes from the database
export const getRelationships =(req,res)=>{
    
        const q = "SELECT followerUserId FROM relationships WHERE followedUserId = ?"; 

    db.query(q, [req.query.followedUserId], (err,data)=>{
        if(err) return res.status(500).json(err);
        return res.status(200).json(data.map(relationship=>relationship.followerUserId)); //returns like into userId
    });
    }
//handles in adding likes into the database
    export const addRelationship =(req, res) =>{
        
        console.log("works")
    const token =req.cookies.accessToken;
    if(!token) return res.status(401).json("Not Logged In"); 
    jwt.verify(token, "secretkey", (err, userInfo) =>{
        if(err) return res.status(403).json("Token is not valid");
        const q = "INSERT INTO relationships (`followerUserId`,`followedUserId`) VALUES (?)"; //inserts the "likes" data into the database
        const values = [
            userInfo.id,
            req.body.userId
        ];
    db.query(q, [values], (err, data)=>{
        if(err) return res.status(500).json(err);
        return res.status(200).json("Following");
    });
    });
    
};
//handles deleting likes in the database
export const deleteRelationship =(req,res) =>{
    const token =req.cookies.accessToken;
    if(!token) return res.status(401).json("Not Logged In");
    jwt.verify(token, "secretkey", (err,userInfo) =>{
        if(err) return res.status(403).json("Token is not valid");
        const q = "DELETE FROM relationships WHERE `followerUserId` = ? AND `followedUserId`= ?";//removes the "like" data into the database
    db.query(q, [userInfo.id, req.query.userId], (err,data)=>{
        if(err) return res.status(500).json(err);
        return res.status(200).json("Unfollow");
    });
    });
    
};