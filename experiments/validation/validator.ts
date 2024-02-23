import { Draft04, Draft06, Draft07, Draft, JsonError } from "json-schema-library";
import myJsonSchema from "./dataset/1/schema.json";
import myData from "./dataset/1/instance.json";

const jsonSchema: Draft = new Draft07(myJsonSchema);
const errors: JsonError[] = jsonSchema.validate(myData);
// console.log(myData)
console.dir(errors,{depth:null})
// errors.map((error)=>{
//     console.dir(error,{ depth: null })
// })