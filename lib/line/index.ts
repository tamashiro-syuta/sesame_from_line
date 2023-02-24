import { Client, ClientConfig, FlexContainer, FlexMessage, Message, validateSignature } from "@line/bot-sdk";

export class Line {
  config: ClientConfig
  userId: string
  client: Client

  constructor() {
    require('dotenv').config();

    this.config = {
      channelAccessToken: process.env.CHANNEL_ACCESS_TOKEN || '',
      channelSecret: process.env.CHANNEL_SECRET,
    }
    this.userId = process.env.LINE_USER_ID || '';
    this.client = new Client(this.config)
  }

  validateSignature = (body: string | Buffer, signature: string | string[] | undefined) => {
    const stringSignature = this.setSignature(signature)
    return validateSignature(
      Buffer.from(JSON.stringify(body)),
      this.config.channelSecret || '',
      stringSignature
    );
  }

  notify = async () => {
    const message: FlexMessage = {
      type: "flex",
      altText: "カギが開いています",
      contents: this.flexContents
    };
    await this.client.pushMessage(this.userId, message)
      .catch((err: Error) => {
        console.log(err);
      });
  }

  private setSignature = (signature: string | string[] | undefined) => {
    if (typeof signature === 'undefined') return ''
    if (typeof signature === 'string') return signature
    return signature[1]
  }

  private flexContents: FlexContainer = {
    type: "bubble",
    body: {
      type: "box",
      layout: "vertical",
      contents: [
        {
          type: "text",
          text: "カギ開いてるけど、閉める？？",
          weight: "bold",
          size: "md"
        }
      ]
    },
    footer: {
      type: "box",
      layout: "vertical",
      spacing: "sm",
      contents: [
        {
          type: "button",
          style: "primary",
          height: "sm",
          action: {
            type: "postback",
            label: "閉める",
            data: "lock"
          }
        },
        {
          type: "box",
          layout: "vertical",
          contents: [],
          margin: "sm"
        }
      ],
      flex: 0
    }
  }
}
