import http from "node:http";
import { Transform } from "node:stream";

class InverseNumberStream extends Transform {
  _transform(chunk, encoding, callback) {
    const transformed = Number(chunk.toString()) * -1;
    console.log(transformed);
    callback(null, Buffer.from(String(transformed)));
  }
} // transforma um chunk/dado em outro

//req -> ReadableStream
//res -> WritableStream 

const server = http.createServer(async(req, res) => {
  const buffers = []

  for await(const chunk of req){
    buffers.push(chunk)
  }

  const fullStreamContenet = Buffer.concat(buffers).toString()
  console.log(fullStreamContenet, 'HTTP_SERVER');
  return res.end(fullStreamContenet)
});

server.listen(3334);
