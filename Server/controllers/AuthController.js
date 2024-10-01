import jwt from 'jsonwebtoken';
import User from '../models/UserModel.js';

const maxAge = 60 * 60 * 24 * 3 ; // 3  days

const createToken = (email,userId) =>{
    return jwt.sign({email,userId},process.env.JWT_KEY,{expiresIn:maxAge})
};

export const signup = async (req, res,next) => {
    try{
        const email = req.body.email;
        const password = req.body.password;
        if(!email || !password)
        {
            return res.status(400).send("Please enter all fields");
        }
        const user= await User.create({email,password}); 

        res.cookie('jwt',createToken(user.email,user.id),{
            maxAge,
            secure:true,
            sameSite:"None"
        });
        return res.status(201).json({
            user:{
                email:user.email,
                id:user.id,
                // firstName:user.firstName,
                // lastName:user.lastName,
                // image : user.image,
                profileSetup:user.profileSetup,
            }
        });
    }catch(e)
    {
        console.log(e);
        return res.status(500).send("Internal Server Error");
    }


}