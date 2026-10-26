function requireAuth(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }

  req.session.messages = [...(req.session.messages || []), 'You need to log in to view messages'];
  return res.redirect('/');
}

module.exports = requireAuth;
