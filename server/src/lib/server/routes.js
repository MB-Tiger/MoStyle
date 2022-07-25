import AdminRouter from "admin/router";
import ProductRouter from "product/router";
import RateRouter from "rate/router";
import CommentRouter from "comment/router";
import CartRouter from "cart/router";
import CategoryRouter from 'category/router'
import OrderRouter from 'order/router'
import userRouter from 'user/router'
import fileRouter from 'file/router'

export default (app) => {
  app.get("/", (req, res, next) => {
    res.send('<h1> hello <span style="color: red" >world</span> </h1>');
  });

  app.use("/admin/", AdminRouter);

  app.use("/product/", ProductRouter);

  app.use("/rate/", RateRouter);

  app.use("/comment/", CommentRouter);

  app.use("/cart/", CartRouter);

  app.use('/category/', CategoryRouter)

  app.use('/user/', userRouter)

  app.use('/order/', OrderRouter)

  app.use('/file/', fileRouter)


  app.use((error, req, res, next) => {
    printError(error.message)
    res.status(500).json({ msg: error.message })
  })
  
};
