import axios from "axios";
import { response } from "express";
import { setCmdAndHistory } from "./setCmdAndHistory";
import { generateRandomTag } from "./setSign";

type Result = {
  code: number,
  message: string
}

export class Sesame {
  constructor() {
    require('dotenv').config();
  }

  get_status = async (): Promise<Result> => {
    const { UUID, API_KEY } = process.env
    if (UUID === undefined || API_KEY === undefined) {
      const result: Result = {
        code: 500,
        message: '環境変数がセットされていません。'
      }
      return result
    }
    const url = `https://app.candyhouse.co/api/sesame2/${UUID}`;

    try {
      const res = await axios.get(url, { headers: { 'x-api-key': API_KEY } });
      const result: Result = {
        code: res.status,
        message: JSON.stringify(res.data)
      }
      return result
    } catch (error) {
      console.error(error);
      const result: Result = {
        code: 500,
        message: JSON.stringify(error)
      }
      return result
    }
  }

  lock_cmd = async (): Promise<Result> => {
    const { UUID, API_KEY, SECRET_KEY } = process.env
    if (UUID === undefined || API_KEY === undefined || SECRET_KEY === undefined) {
      const result: Result = {
        code: 500,
        message: '環境変数がセットされていません。'
      }
      return result
    }

    const url = `https://app.candyhouse.co/api/sesame2/${UUID}/cmd`;
    const { cmd, history } = setCmdAndHistory('LOCK');
    const base64_history = Buffer.from(history).toString('base64');
    const sign: Buffer = generateRandomTag(SECRET_KEY);

    const headers = { 'x-api-key': API_KEY }
    const body = {
      cmd: cmd,
      history: base64_history,
      sign: sign
    }

    try {
      const res = await axios.post(url, body, { headers: headers });
      const result: Result = {
        code: res.status,
        message: JSON.stringify(res.data)
      }
      return result
    } catch (error) {
      // データ取得が失敗した場合
      console.error(error);
      const result: Result = {
        code: 500,
        message: JSON.stringify(error)
      }
      return result
    }
  }

  unlock_cmd = async (): Promise<Result> => {
    const { UUID, API_KEY, SECRET_KEY } = process.env
    if (UUID === undefined || API_KEY === undefined || SECRET_KEY === undefined) {
      // return response.status(500).send('環境変数がセットされていません。')
      const result: Result = {
        code: 500,
        message: '環境変数がセットされていません。'
      }
      return result
    }

    const url = `https://app.candyhouse.co/api/sesame2/${UUID}/cmd`;
    const { cmd, history } = setCmdAndHistory('UNLOCK');
    const base64_history = Buffer.from(history).toString('base64');
    const sign: Buffer = generateRandomTag(SECRET_KEY);

    const headers = { 'x-api-key': API_KEY }
    const body = {
      cmd: cmd,
      history: base64_history,
      sign: sign
    }

    try {
      const res = await axios.post(url, body, { headers: headers });
      const result: Result = {
        code: res.status,
        message: JSON.stringify(res.data)
      }
      return result
    } catch (error) {
      console.error(error);
      const result: Result = {
        code: 500,
        message: JSON.stringify(error)
      }
      return result
    }
  }
}
