if (!process.env.NODE_ENV) {
  process.env.NODE_ENV = "development";
}

const IS_PROD = process.env.NODE_ENV === "production";

const Config = {
  SERVER: IS_PROD
    ? `https://${process.env.REACT_APP_DOMAIN_NAME}`
    : `http://localhost:${process.env.REACT_APP_DEFAULT_PORT}`,
  PORT: 80,
};

export default Config;
