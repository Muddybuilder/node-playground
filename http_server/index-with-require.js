const http = require("http");
const today = require("./today");

const requestListener = function (req, res) {
  res.writeHead(200);
  const curDate = today.getDate();
  curHour = curDate.getHours();
  let greet = "";
  if (curHour >= 5 && curHour < 12) {
    greet = "Good Morning";
  } else if (curHour >= 12 && curHour < 18) {
    greet = "Good Afternoon";
  } else {
    greet = "Good Evening";
  }
  // morning
  // 5 - 12am
  // Afternoon
  // 12 - 6 pm
  // Evening
  // 6pm - 5am

  res.end(`${greet}, The date today is ${curDate}`);
};

const port = 8080;
const server = http.createServer(requestListener);
console.log("server listening on port: " + port);
server.listen(port);
