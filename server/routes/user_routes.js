import express from "express";
import { v4 as uuidv4 } from 'uuid';


const router=express.Router();

const datas=[];
// / is used as /users is used in index.js file
router.get('/',(req,res)=>{
 //There can be only one send 
    res.send(datas)
})

router.post('/',(req,res)=>{
    const userDetails=req.body;
    //To additionally add another field to the existing json file
    const userId={...userDetails,"id":uuidv4()}
    res.send("Post done successfully")
    datas.push(userId)
    console.log(req.body)
})

router.get('/:id',(req,res)=>{
    const id_param=req.params;
    const found=datas.find((dummy)=>{dummy.id===id_param});
    console.log(found)
    res.send(found)
})

//inorder to use this user_routes file we need to export it

export default router;