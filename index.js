const http = require("http");
const fs = require("fs");
const path = require("path");

const PORT = 8081;

const requestHandler = (req, res) => {
  let filePath = "." + req.url;

   // ✅ Custom path mapping
  if (filePath === "./index") filePath = "./index.html";
  if (filePath === "./about") filePath = "./about.html";
  if (filePath === "./contact") filePath = "./contact.html";


  const extname = path.extname(filePath);
  let contentType = "text/html";

  switch (extname) {
    case ".js":
      contentType = "text/javascript";
      break;
    case ".css":
      contentType = "text/css";
      break;
    case ".png":
      contentType = "image/png";
      break;
    case ".jpg":
    case ".jpeg":
      contentType = "image/jpeg";
      break;
    case ".gif":
      contentType = "image/gif";
      break;
    default:
      contentType = "text/html";
      break;
  }

  fs.readFile(filePath, (err, content) => {
    if (err) {
      if (err.code === "ENOENT") {
        fs.readFile("./404.html", (err404, content404) => {
          res.writeHead(404, { "Content-Type": "text/html" });
          res.end(content404, "utf-8");
        });
      } else {
        res.writeHead(500);
        res.end(`Server Error: ${err.code}`);
      }
    } else {
      res.writeHead(200, { "Content-Type": contentType });
      res.end(content, "utf-8");
    }
  });
};

const server = http.createServer(requestHandler);

server.listen(PORT, () => {
  console.log(`✅ Server running at http://localhost:${PORT}`);
});