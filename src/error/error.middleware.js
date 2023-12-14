export const errorMiddleware= async (error, req, res, next)=>{
res.send({status:"error", message:error.message, error:error.name})
}