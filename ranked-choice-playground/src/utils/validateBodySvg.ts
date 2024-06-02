import Ajv from "ajv";
import addFormats from "ajv-formats";
import variantSchema from "../config/body-variants-schema.json";
import { MensBodySVGConfiguration as BodyVariant } from "../types/body-variants";

const ajv = new Ajv();
addFormats(ajv);

const validate = ajv.compile(variantSchema);

export function validateBodySvgVariants(data: any): data is BodyVariant[] {
  const valid = validate(data);
  if (!valid) {
    console.error(validate.errors);
  }
  return valid as boolean;
}
