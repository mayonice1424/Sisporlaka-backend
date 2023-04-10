export const verifyPassword = (req, res, next) => {
const { password, confPassword } = req.body;
if (password !== confPassword) {
  res.status(401).json({ error: "Password dan Confirm Password tidak cocok" });
  return;
};
next();
}
