const { Router}=require('express')
const authRouter=Router();

authRouter.get('/',(req,res)=>{
    res.render('auth/login');
})

authRouter.post('/login',(req,res)=>{
    // Perform authentication logic here
});

authRouter.get('/register',(req,res)=>{
    res.render('auth/register');
})

authRouter.post('/register',(req,res)=>{
    // Perform registration logic here
});

module.exports=authRouter;