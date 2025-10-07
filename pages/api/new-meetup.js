import { MongoClient } from "mongodb";

async function handler(req, res) {
  if (req.method == "POST") {
    const data = req.body;
    const { title, image, address, description } = data;

    const client = await MongoClient.connect(
      "mongodb+srv://zeeldevani90_db_user:A3drJtQ5aNKmtfyl@cluster.kbe8kic.mongodb.net/meetups?retryWrites=true&w=majority&appName=Cluster"
    );
    const db = client.db();

    const meetupscollection = db.collection("meetups");

    const result = await meetupscollection.insertOne(data);
    console.log(result);

    client.close();

    res.status(200).json({
      suceess: "true",
      data: result,
    });
  }
}

export default handler;
