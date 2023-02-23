import express from 'express';
import { Request, Response } from 'express';
import axios from 'axios'

type Props = {
  res: Response
}

export const getStatus = async ({ res }: Props) => {
  require('dotenv').config();
  const { UUID, API_KEY } = process.env
  const url = `https://app.candyhouse.co/api/sesame2/${UUID}`;

  try {
    // getでデータを取得
    const response = await axios.get(url, { headers: { 'x-api-key': API_KEY } });
    // 取得したデータが変数usersに格納される
    const data = response.data;
    res.send(data);
  } catch (error) {
    // データ取得が失敗した場合
    console.error(error);
    res.send(error)
  }
}
