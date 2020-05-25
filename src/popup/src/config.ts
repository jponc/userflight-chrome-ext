type Config = {
  apiHost: string
}

const production: Config = {
  apiHost: "https://api.userflight.com",
};

const staging: Config = {
  apiHost: "https://api-staging.userflight.com",
};

const development: Config = {
  apiHost: "https://api-staging.userflight.com",
}

export let config: Config;

switch(process.env.REACT_APP_STAGE) {
  case "production":
    config = production;
    break;

  case "staging":
    config = staging;
    break;

  case "development":
    config = development;
    break;

  default:
    throw new Error("Config error");
}
