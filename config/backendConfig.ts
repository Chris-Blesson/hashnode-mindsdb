import SuperTokens from "supertokens-node";
import ThirdPartyPasswordlessNode from "supertokens-node/recipe/thirdpartypasswordless";
import SessionNode from "supertokens-node/recipe/session";
import { appInfo } from "./appInfo";
import { TypeInput } from "supertokens-node/types";

export const backendConfig = (): TypeInput => {
  return {
    framework: "custom",
    supertokens: {
      connectionURI:
        "https://st-dev-94580d10-a8cb-11ee-ac36-7fb04e67268e.aws.supertokens.io",
      apiKey: "BSZUBKAMVpPPUJA5rYInAWQYPH",
    },
    appInfo,
    recipeList: [
      ThirdPartyPasswordlessNode.init({
        flowType: "USER_INPUT_CODE",
        contactMethod: "EMAIL",
        providers: [
          {
            config: {
              thirdPartyId: "google",
              clients: [
                {
                  clientId:
                    "294100134835-q6jgjcmjrcj5e8ug3grvu6n21tkhnme4.apps.googleusercontent.com",
                  clientSecret: "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",
                },
              ],
            },
          },
        ],
      }),
      SessionNode.init(),
    ],
    isInServerlessEnv: true,
  };
};

let initialized = false;
// This function is used in your APIs to make sure SuperTokens is initialised
export function ensureSuperTokensInit() {
  if (!initialized) {
    SuperTokens.init(backendConfig());
    initialized = true;
  }
}
