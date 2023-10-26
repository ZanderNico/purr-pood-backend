const checkAdminRole = (req, res, next) => {
  // Check if the user's role is 'admin'
  if (req.user_role !== 'admin') {
    return res.status(403).send({ message: 'Access denied. Admin role required.' });
  }
  // If the user has admin privileges, continue to the next middleware or route handler.
  next();
};

module.exports = checkAdminRole;