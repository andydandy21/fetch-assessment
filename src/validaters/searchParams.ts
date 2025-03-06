import { array, InferInput, number, object, optional, string } from "valibot";

const sizeSchema = optional(number(), 12);
const fromSchema = optional(number(), 0);
const sortSchema = optional(string(), "breed:asc");
const breedsSchema = optional(array(string()));
const zipCodesSchema = optional(array(string()));
const ageMinSchema = optional(number());
const ageMaxSchema = optional(number());

export const dogSearchSchema = object({
  size: sizeSchema,
  from: fromSchema,
  sort: sortSchema,
  breeds: breedsSchema,
  zipCodes: zipCodesSchema,
  ageMin: ageMinSchema,
  ageMax: ageMaxSchema,
});
export type DogSearchParams = InferInput<typeof dogSearchSchema>;
