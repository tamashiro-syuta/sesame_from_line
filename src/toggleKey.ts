import axios from 'axios'
import { generateRandomTag } from '../lib/setSign';
import { setCmdAndHistory } from '../lib/setCmdAndHistory';
import { ExRequest } from '.';
import { Response } from 'express';

type Props = {
  req: ExRequest
  res: Response
}

export const toggleKey = async ({ req, res }: Props) => {
  require('dotenv').config();
  const { UUID, API_KEY, SECRET_KEY } = process.env

  if (UUID === undefined || API_KEY === undefined || SECRET_KEY === undefined) {
    return res.status(400).send('環境変数がセットされていません。')
  }

  const url = `https://app.candyhouse.co/api/sesame2/${UUID}/cmd`;
  console.log(req.query.lockType);
  const { cmd, history } = setCmdAndHistory(req.query.lockType);
  const base64_history = Buffer.from(history).toString('base64');
  const sign: Buffer = generateRandomTag(SECRET_KEY);

  const headers = { 'x-api-key': API_KEY }
  const body = {
    cmd: cmd,
    history: base64_history,
    sign: sign
  }

  try {
    // getでデータを取得
    const response = await axios.post(url, body, { headers: headers });
    // 取得したデータが変数usersに格納される
    const data = response.data;
    res.send(data);
  } catch (error) {
    // データ取得が失敗した場合
    console.error(error);
    res.status(500).send(error)
  }
}
