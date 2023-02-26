import jwt from "jsonwebtoken";
//This function is used to check whether the user has logged in for every page request
function auth(req,res,next){
    try{
        const token=req.cookies.token
        if(!token){
            res.status(401).json({message:"Unauthorized"})
        }

        const verified=jwt.verify(token,process.env.JWT_SECRET)
        req.user=verified.user;

        next()
    }catch(err){
        console.log(err)
        res.status(401).json({message:"Unauthorized"})
    }
}

export default auth;