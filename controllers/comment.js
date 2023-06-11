import {db} from "../connect.js";
import jwt from "jsonwebtoken";
import moment from "moment";
export const getComments =(req,res)=>{
    
        //Select the necesarry data from the databse
        const q = `SELECT c.*, u.id AS userId, name, profilePic FROM comments AS c JOIN users AS u ON (u.id = c.userId)
        WHERE c.postId = ? ORDER BY c.createdAt DESC`; //Checks the date that post was posted
    db.query(q,[req.query.postId], (err,data)=>{
        if(err) return res.status(500).json(err);
        return res.status(200).json(data);
    });
}; //Inserts the data into the comment database
export const addComment =(req,res) =>{
    const token =req.cookies.accessToken;
    if(!token) return res.status(401).json("Not Logged In");
    jwt.verify(token, "secretkey", (err,userInfo) =>{
        if(err) return res.status(403).json("Token is not valid");
        const q = "INSERT INTO comments (`desc`, `createdAt`, `userId`, `postId`) VALUES (?)";
        const values = [
            req.body.desc,
            moment(Date.now()).format ("YYYY-MM-DD HH:mm:ss"),
            userInfo.id,
            req.body.postId
        ];
    db.query(q, [values], (err,data)=>{
        if(err) return res.status(500).json(err);
        return res.status(200).json("Comment has been created");
    });
    });
    
};