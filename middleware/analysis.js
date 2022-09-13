export const logger = (req, res, next) => {
  const now = new Date();
  console.log(req.method, req.path, now);
  next();
};
