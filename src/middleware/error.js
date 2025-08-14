export const notFound = (req, res, next)=>{
    res.status(404).json({message:"Route not found"});
};

export const errorHandler = (err, req, res, next)=>{
    console.log(err);
    res.status(err.statusCode || 500).json({message: err.message || "Server error"});
};