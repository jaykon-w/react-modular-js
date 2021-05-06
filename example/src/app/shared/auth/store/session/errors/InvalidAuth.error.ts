export class InvalidAuth extends Error {
  constructor(message: string) {
    super(message);
  }
}
