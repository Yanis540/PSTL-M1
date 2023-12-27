import { Draft04, Draft06, Draft07, Draft, JsonError } from "json-schema-library";
import myJsonSchema from "./json-schema.json";
import myData from "./data.json";

const jsonSchema: Draft = new Draft07(myJsonSchema);
const errors: JsonError[] = jsonSchema.validate(myData);
errors.map((error)=>{
    console.log(error)
    console.log(error.data.pointer);
    console.log(error.data.schema);
})