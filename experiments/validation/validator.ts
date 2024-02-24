import { Draft04, Draft06, Draft07, Draft, JsonError ,resolveAllOf} from "json-schema-library";
import myJsonSchema from "./dataset/1/schema.json";
import myData from "./dataset/1/instance.json";

const jsonSchema: Draft = new Draft07(myJsonSchema);
const errors: JsonError[] = jsonSchema.validate(myData);
// console.log(myData)
// console.dir(errors,{depth:null})
errors.map((error)=>{
    switch(error.code){
        case "any-of-error":
        case "all-of-error":
        case "one-of-error":
        case "not-error":
        case "pattern-properties-error":
            const subSchemaErrors = validateWithSubSchema(error.data.schema, error.data.value);
            console.dir(subSchemaErrors,{depth:null})
            break
        default:
            console.dir(error,{ depth: null })
            break;
    }
    
    
})

function validateWithSubSchema(schema: any, data: any): JsonError[] {
    const subSchemaErrors: JsonError[] = [];
    schema.anyOf.forEach((subSchema: any) => {
        const subErrors = new Draft07(subSchema).validate(data);
        if (subErrors.length === 0) {
            // If no errors found with this sub-schema, stop validation and return empty array
            return [];
        } else {
            // Collect errors for this sub-schema
            subSchemaErrors.push(...subErrors);
        }
    });
    return subSchemaErrors;
}
