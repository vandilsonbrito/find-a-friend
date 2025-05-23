export class PetsNotFoundError extends Error {
  constructor() {
    super('Pet(s) not found.')
  }
}
