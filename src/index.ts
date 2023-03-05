import express, { Request, Response } from 'express';
import { Line } from './lib/line';
import { Sesame } from './lib/sesame';
import https from 'https'

export const app = express();
const port = 3000;
const router = express.Router();

const sesame = new Sesame()
const line = new Line()

router.get('/', (_: Request, res: Response) => {
  res.json({
    message: "healthCheck is OK!!"
  });
})

router.get('/get-status', async (_: Request, res: Response) => {
  const { status, data } = await sesame.get_status()
  return res.status(status).send(data)
});

router.post('/lock', async (_: Request, res: Response) => {
  const { status, data } = await sesame.lock_cmd()
  return res.status(status).send(data)
});

router.post('/unlock', async (_: Request, res: Response) => {
  const { status, data } = await sesame.unlock_cmd()
  return res.status(status).send(data)
});

// 鍵が空いていればLINE通知
router.get('/remind-me', async (_: Request, res: Response) => {
  const { data } = await sesame.get_status()
  data
  if (data.CHSesame2Status == 'unlocked') {
    await line.notify();
    return res.json({
      message: "Notification sended!"
    })
  };
  res.json({
    message: "The key is locked"
  })
})

// Webhook
app.post('/webhook', async (req: Request, res: Response) => {
  // Signature検証
  if (!line.validateSignature(req.body, req.headers['x-line-signature'])) {
    return res.status(401).json({
      message: "Invalid signature received"
    })
  }
  // postbackイsベントを処理する
  if (req.body.events.length > 0 && req.body.events[0].type == "postback") {
    await sesame.lock_cmd();
  }
  res.sendStatus(200);
})

app.use('/', router);
app.listen(port, () => console.info(`Express listening on port ${port}!`));
