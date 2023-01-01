import { Router } from "express";
import User from '../models/ScoreCard';

const router = Router();

router.delete("/cards", async (req, res) => {
  try{
    await User.deleteMany({});
    console.log("database deletion successful");
    res.send({message:"Database cleared"});
  }catch(e){ throw new Error("Database deletion failed")};
});
router.post("/card", async (req, res) => {
  console.log(req.body);

  const newUser = new User({name:req.body.name, subject:req.body.subject, score:req.body.score});

  const exist = await User.findOne({name: req.body.name, subject:req.body.subject});
  if (exist){
    console.log("found and remove");
    await exist.remove();
    res.send({message:`Updating(${req.body.name},${req.body.subject},${req.body.score})`, card:true});
    newUser.save();
  }
  else{
    res.send({message:`Adding(${req.body.name},${req.body.subject},${req.body.score})`, card:true});
    newUser.save();
  }
});
router.get("/cards", async (req, res) => {
  if (req.query.type == "name"){
    try{
      const data = await User.find({
        name:req.query.queryString
      })
      if (data.length > 0){
        console.log("found data");

        let arr = new Array(data.length);
        for (let i = 0; i < data.length; i++){
          arr.push(`Found card with name: (${data[i].name},${data[i].subject},${data[i].score})`);
        }
        res.send({messages:arr, message:"no error"});
      }else{
        console.log("data not found");

        res.send({message:`Name ${req.query.queryString} Not Found`});
      }
    }catch(e){
      res.send({message:`${e}`})
    }
  }else if (req.query.type == "subject"){
    try{
      const data = await User.find({
        subject:req.query.queryString
      })
      if (data.length > 0){
        console.log("found data");

        let arr = new Array(data.length);
        for (let i = 0; i < data.length; i++){
          arr.push(`Found card with subject: (${data[i].name},${data[i].subject},${data[i].score})`);
        }
        res.send({messages:arr, message:"no error"});
      }else{
        console.log("data not found");

        res.send({message:`Subject ${req.query.queryString} Not Found`});
      }
    }catch(e){
      res.send({message:`${e}`})
    }
  }
});

export default router;