import {useState} from 'react';
import { makeRequest } from '../../axios';
import {useMutation, useQueryClient} from "@tanstack/react-query"
import "./update.scss"
import { set } from 'mongoose';
//Handles the changes made in the profile
const Update=({setOpenUpdate, user}) =>{
const [cover, setCover]= useState(null)
const [profile, setProfile]= useState(null)
const[texts, setTexts] = useState({//usestates to be used to update setTexts
    name: "",
    city: "",
    website: "",
});
const handleChange = (e) =>{
    setTexts((prev) => ({ ...prev, [e.target.name]: [e.target.value]}));
};


const upload = async(file)=>{
    try{
      const formData = new FormData();
      formData.append("file", file);
      const res = await makeRequest.post("/upload", formData);
      return res.data
    }catch(err){
      console.log(err)
    }
  };
  const queryClient = useQueryClient();
  const mutation = useMutation(
    (user) => {
    return makeRequest.put("/users", user);
},
{
  onSuccess: () =>{
    queryClient.invalidateQueries (["user"]);
  },

}
  );
  console.log(user)
const handleClick = async (e) =>{
  e.preventDefault();
  let coverUrl = user.coverPic;
  let profileUrl = user.profilePic;
//checks for both the cover and profile picture when you upload a picture, if you upload a file it's going to use that
//if not it will use the old one
  coverUrl = cover ? await upload(cover) :user.coverPic
  profileUrl = profile ? await upload(profile) : user.profilePic
  
  mutation.mutate({...texts, coverPic:coverUrl,profilePic:profileUrl }); 
  setOpenUpdate(false)

};

    return(
        <div className="update">Update
        <form>
            <input type="file" onChange={e=>setCover(e.target.files[0])}/>
            <input type="file" onChange={e=>set(e.target.files[0])}/>
            <input type="text" name ="name" onChange={handleChange}/>
            <input type="text" name ="city" onChange={handleChange}/>
            <input type="text" name ="website" onChange={handleChange}/>
            <button onClick={handleClick}>Update</button>

        </form>
        <button onClick={()=>setOpenUpdate(false)}>X</button>
        
        </div>
    )
}
export default Update