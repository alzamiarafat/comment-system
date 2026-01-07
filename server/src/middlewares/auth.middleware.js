const { HttpStatus } = require("../shared/constant/httpCode");
const { verifyAccessToken } = require("../shared/utils/jwt.util");

export const auth = async (req, res, next) => {
  try {
    const auth = req.headers.authorization;
    if (!auth) throw new Error("Unauthorized");

    const token = auth.split(" ")[1];
    if (!token) throw new Error("Not authorized");

    const decoded = verifyAccessToken(token);
    req.userId = decoded.sub;
    next();
  } catch (error) {
    return response.failedResponse(
      error.code || HttpStatus.unauthorized,
      error.message || "Invalid token",
      error
    );
  }

  // jwt.verify(token, process.env.JWT_ACCESS_SECRET, (err, payload) => {
  //   if (err) return res.sendStatus(403);
  //   req.userId = payload.sub;
  //   next();
  // });

  // try {
  //   const decoded = jwt.verify(token, process.env.JWT_SECRET);
  //   req.user = await userService.findById(decoded.id);
  //   next();
  // } catch (error) {
  //   return response.failedResponse(
  //     HttpStatus.unauthorized,
  //     error.message || "Invalid token",
  //     error
  //   );
  // }
};
