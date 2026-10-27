const setLocals = (req, res, next) => {
  res.locals.isClubMember = req.user?.status === 'ACTIVE';
  next();
};

module.exports = setLocals;