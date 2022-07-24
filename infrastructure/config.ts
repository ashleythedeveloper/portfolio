/// <reference types="node" />

type Config = {
  ENV: string;
  APP_NAME: string;
};

if (!process.env.ENV || !process.env.APP_NAME) {
  throw new Error(
    "Missing one of the following require environment variables: ENV, APP_NAME"
  );
}

export const config: Config = {
  ENV: process.env.ENV,
  APP_NAME: process.env.APP_NAME,
};
