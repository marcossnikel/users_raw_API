import { Readable } from "node:stream";

class OneToHundredStream extends Readable {
  // arquivo sendo lido
  index = 1;

  _read() {
    const i = this.index++;
    //a cada um segundo estamos lendo os  dados mesmo antes de a string ser completa ja estamos processando e trabalhando com ela.
    setTimeout(() => {
      if (i > 5) {
        this.push(null);
      } else {
        const buffer = Buffer.from(String(i));
        this.push(buffer);
      }
    }, 1000);
  }
}

fetch("http://localhost:3334", {
  method: "POST",
  body: new OneToHundredStream(),
  duplex: "half",
}).then(response => {
  response.text()
}).then(data => {
  console.log(data, 'FAKE_UPLOAD');
})
