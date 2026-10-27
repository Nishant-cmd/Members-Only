const setLocals = (req, res, next) => {
  res.locals.isClubMember = req.user?.status === 'ACTIVE';
  res.locals.isAdmin = req.user?.is_admin;
  next();
};

module.exports = setLocals;