import Anthropic from "@anthropic-ai/sdk";
import { metadataService } from "./metadata.service";
import { Message, MessageParam, TextBlock } from "@anthropic-ai/sdk/resources";
import { response } from "express";
class AiService {
  private client: Anthropic;
  constructor() {
    this.client = new Anthropic({
      apiKey: process.env["ANTHROPIC_API_KEY"],
    });
  }

  async getRecommendtation(testedTemplate: string) {
    const promptMessages = await this.getPromptMessages(testedTemplate);
    const anthropicResponse = await this.client.messages.create({
      model: "claude-3-5-sonnet-20240620",
      max_tokens: 1000,
      messages: promptMessages,
    });
    const formattedResponse = this.formatResponse(anthropicResponse);
    return formattedResponse;
  }

  private formatResponse(message: Message) {
    return message.content
      .filter((message) => message.type === "text")
      .map((message) =>
        JSON.parse(message.text.substring(message.text.indexOf("{")))
      );
  }
  private async getPromptMessages(
    testedTemplate: string
  ): Promise<MessageParam[]> {
    const clContent = await metadataService.getCLContent();
    return [
      {
        role: "user",
        content: [
          {
            type: "text",
            text: `I am angular developer. I have a template and I want to understand if I can replace an element inside of it with element from my components library.
             The component lib and the template I provide you are written in angular.
             This is a json file includes all the components I have with their template:${JSON.stringify(
               clContent
             )}.
             The problemetic template I have is:
         ${testedTemplate}

please give me your answer in json format:
      one sentense with recommendation with key name: recommendation
      modified template: with key name template
            `,
          },
        ],
      },
    ];
  }
}

export const aiService = new AiService();
