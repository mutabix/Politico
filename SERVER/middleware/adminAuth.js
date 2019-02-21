
const adminAuth = {
     isAdmin:(req, res, next) =>{
        if(req.user.isAdmin === true){
            next();
        }else{
            return res.status(401).send({
                staus: 401, 
                error: 'Access Denied. Admin Rights Required'
            })
        }
    }
}


export default adminAuth;
