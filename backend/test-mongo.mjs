import { MongoClient } from "mongodb";

const client = new MongoClient("mongodb://mongo:27017/fullstack");

async function test() {
  try {
    await client.connect();
    const info = await client.db().command({ serverStatus: 1 });
    console.log("Mongo OK:", info.localTime);
  } catch (err) {
    console.error(err);
  } finally {
    await client.close();
  }
}

test();

