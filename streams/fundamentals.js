//Streams ->
process.stdin.pipe(process.stdout);

import { Readable, Writable, Transform, Duplex } from "node:stream";
//duplex fz qualquer tipo de operacao, ex : arquivo fisico do sistema que pode ser lido , escrito....
class OneToHundredStream extends Readable {
  // arquivo sendo lido
  index = 1;

  _read() {
    const i = this.index++;
    //a cada um segundo estamos lendo os  dados mesmo antes de a string ser completa ja estamos processando e trabalhando com ela.
    setTimeout(() => {
      if (i > 100) {
        this.push(null);
      } else {
        const buffer = Buffer.from(String(i));
        this.push(buffer);
      }
    }, 1000);
  }
}

class InverseNumberStream extends Transform {
  _transform(chunk, encoding, callback) {
    const transformed = Number(chunk.toString()) * -1;
    callback(null, Buffer.from(String(transformed)));
  }
} // transforma um chunk/dado em outro

class MultiplyByTenStream extends Writable {
  // os que ja foram lidos sendo processados
  //chunk : o que vem do buffer // encoding : como ta codificada // callback : funcao q chama quando terminou de fazer com a info
  //nao retorna, apenas processa dados
  _write(chunk, encoding, callback) {
    console.log(Number(chunk.toString()) * 10);
    callback();
  }
}

new OneToHundredStream()
  .pipe(new InverseNumberStream())
  .pipe(new MultiplyByTenStream());
