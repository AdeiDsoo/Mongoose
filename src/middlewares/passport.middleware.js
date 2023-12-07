
export const checkRole = (role) => {
  return (req, res, next) => {
    // role: 'user'
  console.log(req.user, '<--------------------------------------');
    if (!req.user || req.user.role !== role) {
      return res.status(403).json({ message: "Permiso denegado" });
    }
    next();
  };
};
