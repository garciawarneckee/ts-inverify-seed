import { RequestSchema } from "../../core/requests/RequestSchema";

export const CreateUserRequest: RequestSchema = {
  firstName: { type: "string", required: true },
  lastName: { type: "string", required: true },
  birthDate: { type: "number", required: true },
  email: { type: "string", required: false }
}