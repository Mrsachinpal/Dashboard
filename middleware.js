const Admin=require('./model/Admin');

const islogin=(req,res,next)=>{
    if(!req.isAuthenticated()){
        return res.redirect('/admin/login')
    }
    next();
}

let isAuthor = async (req, res, next) => {
    try {
        let { id } = req.params;
        let list = await Admin.findById(id);

        // Check if list is not found
        if (!list) {
            console.log("You are not the owner of this list ")
            return res.status(404).send('List not found');
        }
        // Continue with authorization check if list is found
        if (!list.author.equals(req.user._id)) {
            return res.redirect('/login');
        }
        next(); // Allow request to proceed if authorized
    } catch (err) {
        res.status(500).send('Server Error');
    }
};


module.exports={islogin, isAuthor};