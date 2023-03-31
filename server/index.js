const express = require("express");
const app = express();
const cors = require("cors");
const port = 3042;

app.use(cors());
app.use(express.json());

const balances = {
  "040bf1d2113f7014ac33b31e7dd844536c689af596be8fbb6ed0b942e334be6cc86017c1afcbc40e88caedd5f42effa0f0340132c5e5b635aec8dbf352372f511f": 100,
  "0419dfcef6e8b8b23f67babc0cd426bad0034bd1519dcded68b36df7b08412f5d1ebfa153fe59340a834938a3c74528a186685f20a5e56e79278713fe7e7b8e866": 50,
  "0419dfcef6e8b8b23f67babc0cd426bad0034bd1519dcded68b36df7b08412f5d1ebfa153fe59340a834938a3c74528a186685f20a5e56e79278713fe7e7b8e866": 75,
};

app.get("/balance/:address", (req, res) => {
  const { address } = req.params;
  const balance = balances[address] || 0;
  res.send({ balance });
});

app.post("/send", (req, res) => {
  const { sender, recipient, amount } = req.body;

  setInitialBalance(sender);
  setInitialBalance(recipient);

  if (balances[sender] < amount) {
    res.status(400).send({ message: "Not enough funds!" });
  } else {
    balances[sender] -= amount;
    balances[recipient] += amount;
    res.send({ balance: balances[sender] });
  }
});

app.listen(port, () => {
  console.log(`Listening on port ${port}!`);
});

function setInitialBalance(address) {
  if (!balances[address]) {
    balances[address] = 0;
  }
}
