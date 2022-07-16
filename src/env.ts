
/**
 * Environment proxy.
 */
class Env {
  // @ts-ignore Vite env
  mode = import.meta.env.MODE;
  
  variables = {
    apiKeyName: "API_KEY",
    projectIdName: "PROJECT_ID",
    storageBucketName: "STORAGE_BUCKET",
    messagingSenderIdName: "MESSAGE_SENDER_ID",
    appIdName: "API_ID",

    apiKey: (): string =>
      this.getVariable(this.variables.apiKeyName),

    projectId: (): string =>
      this.getVariable(this.variables.projectIdName),

    storageBucket: (): string =>
      this.getVariable(this.variables.storageBucketName),

    messagingSenderId: (): string =>
      this.getVariable(this.variables.messagingSenderIdName),

    appId: (): string =>
      this.getVariable(this.variables.appIdName),
  };

  /**
   * Get an environment variable.
   * @param {string} variableName Variable name.
   * @return {string} String value.
   */
  getVariable = (variableName: string): string => {
    // @ts-ignore Vite global variable
    const variable = globalEnv[variableName];

    if (!variable) {
      throw new Error(`${variableName} env not provided`);
    }

    return variable;
  }
}

const env = new Env();

export default env;
