export const unknownHandler =
  ("*",
  (req, res) => {
    res.status(404).send("Site not found");
  });

export const errorHandler = (err, req, res, next) => {
  console.log(err);

  res.status(500).send("Sorry, something went wrong, we gonna fix it");
  next();
};
