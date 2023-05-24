import { getSession } from "next-auth/react";

const handler = async (req, res) => {
  const session = await getSession({ req });
  console.log(session);
  if (!session) {
    return res.status(401).send({ message: "No session" });
  }
};
export default handler;
