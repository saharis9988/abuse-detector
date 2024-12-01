import { AiService } from "../services/ai.service";
import { MetadataService } from "../services/metadata.service";
import { ANTHROPIC_CLIENT } from "./tokens.config";
import Anthropic from "@anthropic-ai/sdk";
import { registerDependency } from "./utils";
import { ProviderRegistration } from "./types";

/**
 * @fileoverview Registrations of the application dependencies in the DI container
 */

const registrations: Readonly<ProviderRegistration>[] = [
  {
    token: AiService,
    provider: { useClass: AiService },
  },
  {
    token: MetadataService,
    provider: { useClass: MetadataService },
  },
  {
    token: ANTHROPIC_CLIENT,
    provider: {
      useValue: new Anthropic({
        apiKey: process.env["ANTHROPIC_API_KEY"],
      }),
    },
  },
] as const;

// Registering the dependencies in the DI container on startup
registrations.map((registration) => registerDependency(registration));
