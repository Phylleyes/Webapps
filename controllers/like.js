import {db} from "../connect.js";
import jwt from "jsonwebtoken";

//handles getting the likes from the database
export const getLikes =(req,res)=>{
    
        const q = "SELECT userId FROM likes WHERE postId = ?"; 

    db.query(q, [req.query.postId], (err,data)=>{
        if(err) return res.status(500).json(err);
        return res.status(200).json(data.map(like=>like.userId)); //returns like into userId
    });
    }
//handles in adding likes into the database
    export const addLike =(req, res) =>{
    const token =req.cookies.accessToken;
    if(!token) return res.status(401).json("Not Logged In"); 
    jwt.verify(token, "secretkey", (err, userInfo) =>{
        if(err) return res.status(403).json("Token is not valid");
        const q = "INSERT INTO likes (`userId`,`postId`) VALUES (?)"; //inserts the "likes" data into the database
        const values = [
            userInfo.id,
            req.body.postId
        ];
    db.query(q, [values], (err, data)=>{
        if(err) return res.status(500).json(err);
        return res.status(200).json("Post Has Been Liked");
    });
    });
    
};
//handles deleting likes in the database
export const deleteLike =(req,res) =>{
    const token =req.cookies.accessToken;
    if(!token) return res.status(401).json("Not Logged In");
    jwt.verify(token, "secretkey", (err,userInfo) =>{
        if(err) return res.status(403).json("Token is not valid");
        const q = "DELETE FROM likes WHERE `userId` = ? AND `postId`= ?";//removes the "like" data into the database
    db.query(q, [userInfo.id, req.query.postId], (err,data)=>{
        if(err) return res.status(500).json(err);
        return res.status(200).json("Like has been removed");
    });
    });
    
};