import { z } from "zod";
import axios from "axios";

import {
  defineDAINService,
  ToolConfig,
  ServiceConfig,
  ToolboxConfig,
  ServiceContext,
} from "@dainprotocol/service-sdk";

import { imagedata } from './imagedata';
import {
  Anthropic
} from '@anthropic-ai/sdk';
import { DataKey } from "./imagedata";
const c_anthropic = new Anthropic({
  apiKey: DataKey, // defaults to process.env["ANTHROPIC_API_KEY"]
});

let msg;
async function initAnthropic() {
  msg = await c_anthropic.messages.create({
    model: "claude-3-5-sonnet-20241022",
    max_tokens: 1024,
    system: "Hello, Claude",
    messages: [{ role: "user", content: "Hello, Claude" }],
  });
  console.log(msg)
}

function getBase64(url) {
  return axios
    .get(url, {
      responseType: 'arraybuffer'
    })
    .then(response => Buffer.from(response.data, 'binary').toString('base64'))
}

async function imageAnthropic(imageUrl) {

  let message = await c_anthropic.messages.create({
    model: "claude-3-5-sonnet-20241022",
    max_tokens: 1024,
    messages: [
      {
        role: "user",
        content: [
          {
            type: "image",
            source: {
              type: "base64",
              media_type: "image/png",
              data: await getBase64(imageUrl),
            },
          },
          {
            type: "text",
            text: "Describe the mood of the drawing."
          }
        ],
      }
    ],
  });
  console.log(message['content'][0]['text'])
  let song = await c_anthropic.messages.create({
    model: "claude-3-5-sonnet-20241022",
    max_tokens: 1024,
    messages: [{ role: "user", content: `List 5 songs that match this vibe in JSON format, with a key \"songs\" which contains an array, each array element matches the format of a key "artist" which contains the artists name, and the key "title" which contains the songs title:` + message['content'][0]['text'] }],
  });
  console.log(song['content'][0]['text'])
  var names = song['content'][0]['text']
  var name = names.replace("{\n", "")
  var names1 = name.replace("\n}", "")
  var title_name = names1.split(',\n')
  return names
}


const analyzeImageConfig: ToolConfig = {
  id: "analyze-image",
  name: "Analyze Image",
  pricing: { pricePerUse: 0, currency: "USD" },
  description: "Take a screenshot and then describe the mood of the drawing on the screen and then recommends a song based on that mood",
  input: z.object({
    imageUrl: z.string().describe("Analyze image of screenshot"),
  }),
  output: z.object({
    answer: z.string().describe("")
  }),
  handler: async ({ imageUrl }, agentInfo) => {

    const response = await imageAnthropic(imageUrl);

    return {
      text: `${response}`,
      data: {
        answer: response
      },
      ui: {},
    };
  },
}


const dainService = defineDAINService({
  metadata: {
    title: "Images to Songs: Feel your Creations",
    description:
      "A service for converting images to songs to suit the mood of the artist and allow them to amplify their creations",
    version: "1.0.0",
    author: "Your Name",
    tags: ["songs", "dain"],
    logo: "https://cdn-icons-png.flaticon.com/512/252/252035.png"
  },
  identity: {
    apiKey: process.env.DAIN_API_KEY,
  },
  tools: [analyzeImageConfig],
});
dainService.startNode({ port: 2022 }).then(() => {
});
