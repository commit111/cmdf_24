const mc = require("mongodb");
const sav = require("mongodb");

//import { MongoClient } from "mongodb";
//import { ServerApiVersion } from "mongodb";

const uri =
  "mongodb+srv://cmdf:pesto@cmd-f2024.xdlyfm6.mongodb.net/?retryWrites=true&w=majority&appName=cmd-f2024";
// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new mc.MongoClient(uri, {
  serverApi: {
    version: sav.ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
  ssl: true,
});
const cmdf = client.db("cmdf");
const termdef = cmdf.collection("term-def");

async function connectMongoDb() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!",
    );
    
    const doc = { image: "linda.png", def: "linda" };
    const result = await termdef.insertOne(doc);
    console.log(
       `A document was inserted with the _id: ${result.insertedId}`,
    );
    
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}
//run().catch(console.dir);
module.exports = { connectMongoDb };



//--------------------------------------------

// import http from "http";
// import fs from "fs";

// fs.readFile('index.html', function (err, html) {
//     if (err) {
//         throw err;
//     }
//     http.createServer(function(request, response) {
//         response.writeHeader(200, {"Content-Type": "text/html"});
//         response.write(html);
//         response.end();
//     }).listen(8000);
// });
// const express = require('express');
