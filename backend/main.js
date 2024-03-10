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
const rawpages = cmdf.collection("raw-pages");

async function connectMongoDb() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!",
    );

    await addEntryToPageDb("cat.png", "kitty");
    await deleteEntryFromPageDb("frog.png", "froggy");

    const arr =  await returnAllEntriesPageDb();
    console.log(arr[0]);
    
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}

async function addEntryToDb(image_str, comment_str) {
  //ADD AN ELEMENT TO COLLECTION
  const doc = { image: image_str, def: comment_str };
  const result = await termdef.insertOne(doc);
  console.log(
     `A document was inserted with the _id: ${result.insertedId}`,
  );
}


async function addEntryToPageDb(image_str, page_num) {
  //ADD AN ELEMENT TO COLLECTION
  const doc = { image: image_str, def: page_num };
  const result = await rawpages.insertOne(doc);
  console.log(
     `A document was inserted with the _id: ${result.insertedId}`,
  );
}

async function deleteEntryFromDb(image_str, comment_str) {
  //DELETE AN ELEMENT FROM COLLECTION
   const doc = { image: image_str, def: comment_str };
  const deleteResult = await termdef.deleteOne(doc);
  console.dir(deleteResult.deletedCount);
}
async function deleteEntryFromPageDb(image_str, page_num) {
  //DELETE AN ELEMENT FROM COLLECTION
   const doc = { image: image_str, def: page_num };
  const deleteResult = await rawpages.deleteOne(doc);
  console.dir(deleteResult.deletedCount);
}

async function returnAllEntriesDb() {
  //RETURN ALL ELEMENTS IN COLLECTION
  var arr = [];
  const collectionElements = termdef.find();
  for await (const doc of collectionElements) {
    arr.push({
      image: doc.image,
      def: doc.def,
    });
  } 
  return arr;
}

async function returnAllEntriesPageDb() {
  //RETURN ALL ELEMENTS IN COLLECTION
  var arr = [];
  const collectionElements = rawpages.find();
  for await (const doc of collectionElements) {
    arr.push({
      image: doc.image,
      def: doc.def,
    });
  } 
  return arr;
}

//run().catch(console.dir);
module.exports = { connectMongoDb, addEntryToDb };


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

//-----------------------------------------------

const port = 3000;

function start() {
  // app.post( "/addEntry", function ( req, res ) {
  //     console.log( "Got request to add Entry with the following data:" );
  //     console.log( req.body );
  //     addEntry( req.body );
  //     res.send();
  // });
  let express = require('express');
  let app = express();
  let bodyParser = require('body-parser');
  let http = require('http').Server(app);

  app.use(bodyParser.json())
  app.use(bodyParser.urlencoded({ extended: true }));

  app.get('/', function (req, res) {
    res.sendFile('/index.html', {root:'.'});
  });

  app.get('/viewpdf.html', function (req, res) {
    res.sendFile('/viewpdf.html', {root:'.'});
  }); 
  
  app.get('/card.html', function (req, res) {
    res.sendFile('/card.html', {root:'.'});
  });
  app.get('/highlighttool.html', function (req, res) {
    res.sendFile('/highlighttool.html', {root:'.'});
  });
  
  app.get('/tabletool.html', function (req, res) {
    res.sendFile('/tabletool.html', {root:'.'});
  });
  
  app.set('port', process.env.PORT || 3000);
  http.listen(app.get('port'), function() {
      console.log('listening on port', app.get('port'));
  });
}

start();