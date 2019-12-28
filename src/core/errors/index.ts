export class EntityNotFoundError extends Error {
  constructor(entity: string, id: string) {
    super();
    this.message = `${entity} with id: ${id} coudn't be found`;
  }
}