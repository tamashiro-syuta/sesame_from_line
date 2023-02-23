const aesCmac = require('node-aes-cmac').aesCmac;

export const generateRandomTag = (secret: string) => {
  let key = Buffer.from(secret, 'hex')
  const date = Math.floor(Date.now() / 1000);
  const dateDate = Buffer.allocUnsafe(4);
  dateDate.writeUInt32LE(date);
  const message = Buffer.from(dateDate.slice(1, 4));
  return aesCmac(key, message);
}
