import express, { Request, Response } from 'express';
import { Sesame } from '../lib/sesame';

export const app = express();
const port = 3000;
const router = express.Router();

const sesame = new Sesame()

router.get('/get-status', async (_: Request, res: Response) => {
  const { code, message } = await sesame.get_status()
  return res.status(code).send(message)
});

router.post('/lock', async (_: Request, res: Response) => {
  const { code, message } = await sesame.lock_cmd()
  return res.status(code).send(message)
});

router.post('/unlock', async (_: Request, res: Response) => {
  const { code, message } = await sesame.unlock_cmd()
  return res.status(code).send(message)
});

app.use('/', router);
app.listen(port, () => console.info(`Express listening on port ${port}!`));
