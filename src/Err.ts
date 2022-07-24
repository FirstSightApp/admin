
export class Err {
  public code: string | null;
  public message: string;

  constructor(code: string | null, message: string) {
    this.code = code;
    this.message = message;
  }

  format = (): string => {
    const code = this.code ? `${this.code} :`: "";
    return code + this.message;
  };
}
