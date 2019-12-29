export class EntityNotFoundError extends Error {
  constructor(entity: string, id: string) {
    super();
    this.message = `${entity} with id: ${id} coudn't be found`;
  }
}

export class NotRequiredKeysError extends Error {
  constructor(payload: any, missingKeys: string[]) {
    super();
    this.message = `Keys ${missingKeys.join(",")} are not present for the request ${JSON.stringify(payload)}`;
  }
}

export class NotValidKeyError extends Error {
  constructor(payload: any, invalidKey: string) {
    super();
    this.message = `Key ${invalidKey} not found as a valid key in request ${JSON.stringify(payload)}`;
  }
}

export class NotValidKeyTypeError extends Error {
  constructor(invalidKey: string, expectedType: string) {
    super();
    this.message = `Key ${invalidKey} has an invalid type it is expected to have ${expectedType} type`;
  }
}