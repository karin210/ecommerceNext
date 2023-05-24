import { getSession } from "next-auth/react";
import db from "../../../../utils/db";
import Product from "../../../../models/Product";

const handler = async (req, res) => {
  // console.log(`the payload is ${req.body}`);
  //   const session = await getSession({ req });
  //   console.log(session);
  //   if (!session) {
  //     return res.status(401).send("signin required");
  //   }
  //   const { user } = session;
  //   console.log(user);
  await db.connect();
  const newProduct = new Product({ ...req.body });

  await newProduct.save();

  res.status(200).send(newProduct);
};
export default handler;
