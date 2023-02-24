import axios, { AxiosResponse } from "axios";
import { setCmdAndHistory } from "./setCmdAndHistory";
import { generateRandomTag } from "./setSign";
import { LockType, Status } from "./types";

export class Sesame {
  constructor() {
    require('dotenv').config();
  }

  get_status = async (): Promise<AxiosResponse<Status, any>> => {
    const { UUID, API_KEY } = process.env
    const url = `https://app.candyhouse.co/api/sesame2/${UUID}`;

    return await axios.get<Status>(url, { headers: { 'x-api-key': API_KEY } });
  }

  lock_cmd = async (): Promise<AxiosResponse<any, any>> => {
    return await this.oparate_sesame('locked')
  }

  unlock_cmd = async (): Promise<AxiosResponse<any, any>> => {
    return await this.oparate_sesame('unlocked')
  }

  private oparate_sesame = async (lockType: LockType) => {
    const { UUID, API_KEY, SECRET_KEY } = process.env
    const url = `https://app.candyhouse.co/api/sesame2/${UUID}/cmd`;
    const { cmd, history } = setCmdAndHistory(lockType);
    const base64_history = Buffer.from(history).toString('base64');
    const sign: Buffer = generateRandomTag(SECRET_KEY || '');

    const headers = { 'x-api-key': API_KEY }
    const body = {
      cmd: cmd,
      history: base64_history,
      sign: sign
    }

    return await axios.post(url, body, { headers: headers });
  }
}
