import { db } from "../connect.js"
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

//creates a new user in the database
export const register =(req,res) => {
   //check user if exist 

   const q = "SELECT * FROM users WHERE username = ?";
   db.query(q,[req.body.username],(err,data)=>{
    if(err) return res.status(500).json(err);
    if(data.length) return res.status(409).json("User already exist");
   

   
   //hashes the password
   const salt = bcrypt.genSaltSync(10);
   const hashedPassword = bcrypt.hashSync(req.body.password, salt);
   // creates a new user
   const q ="INSERT INTO users (`username`, `email`,`password`,`name`) VALUE(?)";
   const values =[req.body.username,req.body.email,hashedPassword, req.body.name]
   db.query(q,[values], (err,data)=>{
    if (err) return res.status(500).json(err);
    return res.status(200).json("User has been created");
   });
   });

};
//checks if the user is in the database using username and password
export const login =(req,res) => {
const q ="SELECT * FROM users WHERE username =?"
//checks if the inputted username is correct
db.query(q,[req.body.username], (err, data) =>{
    if (err) return res.status(500).json(err);
    if(data.length ===0) return res.status(404).json("User not found");
    const checkPassword =bcrypt.compareSync(req.body.password, data[0].password)
//checks if the password is incorrect and hashes the userid and will be able to reach the userid which will be used 
//in all of the other functions like posts, likes, following users, get timeline posts, and etc.
    if(!checkPassword)
return res.status(400).json("Wrong Password or Username");
const token = jwt.sign({id:data[0].id},"secretkey");
const{password, ...others} = data[0];
res
.cookie("accessToken", token,{
    httpOnly : true,
})
.status(200)
.json(others);
});
};
//logs out the user
export const logout =(req,res) => {
    //clears cookies so it doesn't automatically block my request when getting from the API which is localhost:8800
    res.clearCookie("accessToken", {
        secure:true,
        sameSite:"none"
    }).status(200).json("User has been logged out.")
};