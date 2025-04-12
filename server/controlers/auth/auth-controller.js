const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../../models/User')

//register
const registerUser = async (req, res) => {
  
  const { userName, email, password } = req.body;
  try {
    // Check if user already exists
    const checkUser = await User.findOne({ email });
    if (checkUser) {
      return res.json({
        success: false,
        message: "User already exists with the same email! Please try with another email",
      });
    }

    // Hash the password
    const hashPassword = await bcrypt.hash(password, 12);
    const newUser = new User({
      userName,
      email,
      password: hashPassword,
    });

    // Save the new user to the database
    await newUser.save();
    console.log('User saved successfully');

    return res.json({
      success: true,
      message: 'Registration successful',
    });

  } catch (e) {
    console.error("Error during registration:", e);
    return res.json({
      success: false,
      message: "Some error occurred",
    });
  }
};



//login

const loginUser = async(req,res)=>{

  const {email, password} = req.body;

    try{
        const checkUser  = await User.findOne({email});
        if(!checkUser){
           return res.json({
            success:false, 
            message:"User doesn't exist! Please register first",
           })
        }
        const checkPassword = await bcrypt.compare(password,checkUser.password);

        if(!checkPassword)
        {
          return res.json({
            success:false, 
            message:"Incorrect password! please try again",
           })
        }

     
        const token = jwt.sign(
          {
          id:checkUser._id,
          role:checkUser.role,
          email:checkUser.email,
          userName:checkUser.userName,
         },
         'CLIENT_SECRET_KEY',
         {
          expiresIn:'60m'
         }
        )

        res.cookie('token',token,{httpOnly:true,secure:false}).json({
          success:true,
          message:"Logged in successful",
          user:{
            email:checkUser.email,
            role:checkUser.role,
            id:checkUser._id,
            userName:checkUser.userName,
          }
        });
    
    }catch(e){
        console.log(e);
        res.status(500).json({
          success : false,
          message:"Some error occured",
        })
    }
}

//logout
const logoutUser = (req,res)=>{
  res.clearCookie('token').json({
    success:true,
    message:"Logged out successful",
  })
}

//auth middleware
const authMiddleware = async(req,res,next)=>{

  const token = req.cookies.token;
  if(!token) 
    return res.status(401).json({
     success:false,
     message:"Unauthorized user!"
    })

   try
   {
      const decoded = jwt.verify(token,'CLIENT_SECRET_KEY');
      req.user = decoded;
      next();
   } catch(error){
      res.status(401).json({
      success:false,
      message:"Unauthorized user!"
   })
  }
}

module.exports = {registerUser, loginUser,logoutUser,authMiddleware}