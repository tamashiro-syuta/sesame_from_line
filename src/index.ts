import express from 'express';
import { Request, Response } from 'express';
import { getStatus } from './getStatus';
import { toggleKey } from './toggleKey';

export const app = express();
const port = 3000;
const router = express.Router();

export interface ExRequest extends Request {
  query: {
    lockType?: string | undefined
  }
}

router.get('/get-status', (req: Request, res: Response) => {
  getStatus({ res })
});

router.post('/toggle-key', (req: ExRequest, res: Response) => {
  // ユーザーを追加する関数
  toggleKey({ req, res })
});

app.use('/', router);
app.listen(port, () => console.info(`Express listening on port ${port}!`));
