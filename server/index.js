// index.js
const verifyProof = require('../utils/verifyProof');
const niceList = require('../utils/niceList.json');
const MerkleTree = require('../utils/MerkleTree');

const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const cors = require('cors');
const port = 3001; 

app.use(bodyParser.json());
app.use(cors());


const MERKLE_TREE = new MerkleTree(niceList);
const MERKLE_ROOT = MERKLE_TREE.getRoot();

app.post('/gift', (req, res) => {
  const body = req.body.name;

  const index = niceList.findIndex((n) => n === body);
  const proof = MERKLE_TREE.getProof(index);
  

  if ((verifyProof(proof, body, MERKLE_ROOT))) {
    res.send("You got a toy robot!");
  } else {
    res.send("You have no Gift");
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});