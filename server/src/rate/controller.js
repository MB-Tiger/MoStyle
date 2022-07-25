import Rate from "./model"
import Product from "../product/model";
import UID from "lib/utils/UID";

export default {
  sumbitRate: async (req, res) => {
    try {
  
      await Rate.rateBlog({
        productId: req.body.productId,
        userId: UID(),
        score: req.body.score
      })
      
      return res.status(200).json({msg: 'ok'})
  
    } catch (error) {
      return res.status(500).json({ msg: error.message })
    }
  }
}