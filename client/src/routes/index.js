import auth from "../modules/auth/auth.routes";
import comment from "../modules/comment/comment.routes";
// import dashboard from "../modules/dashboard/dashboard.routes";
// import product from "../modules/product/product.routes";

const appRoutes = [...auth, ...comment];
export default appRoutes;
