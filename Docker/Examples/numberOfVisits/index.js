const express = require("express");
const redis = require("redis");

const app = express();
const client = redis.createClient({
  host: "redis-server", // usually the host is http://www.mysite.com
  port: 6379
});

client.set("visits", 0);

app.get("/", (req, res) => {
  client.get("visits", (err, visits) => {
    res.send("Number of visits is " + visits);
    client.set("visits", parseInt(visits) + 1);
  });
});

app.listen(8081, () => console.log("Listening on port 4001")); // this line is actually correct since docker compose is accessing port 8081 and making it available in port 4001
