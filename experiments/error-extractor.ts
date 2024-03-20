import { Draft07, Draft, JsonError, JsonSchema ,draft07Config} from "json-schema-library";

import myJsonSchema from "./validator/json-schema.json";
import myData from "./validator/data.json";
import jsf, { type Schema } from 'json-schema-faker';



// Extraire les erreurs associées à un sous-schéma spécifique à partir des erreurs initiales
function extractAllPointerErrors(jsonSchema: Draft,schema:JsonSchema, data: any, errors: JsonError[]): JsonError[] {
    let allPointerErrors: JsonError[] = [];
    errors.forEach(error => {
        
    });
    return allPointerErrors;
}

// Utilisation de la fonction

// const schema = myJsonSchema
// const jsonSchema: Draft = new Draft07(myJsonSchema);
// const errors: JsonError[] = jsonSchema.validate(myData);
// // Extraire toutes les erreurs associées à des sous-schémas spécifiques à partir des erreurs initiales
// const allPointerErrors: JsonError[] = extractAllPointerErrors(jsonSchema,schema,myData,errors);

// // Afficher toutes les erreurs associées à des sous-schémas spécifiques
// console.log(allPointerErrors);
const schema = {
    oneOf: [
        {
            type: "object",
            properties: { id: { const: "1" }, title: { type: "number" } }
        },
        {
            type: "object",
            properties: { id: { const: "2" }, title: { type: "number" } }
        },
        {
            type: "object",
            properties: { id: { const: "3" }, title: { type: "number" } }
        }
    ]
};
const data = { id: "2", title: "not a number" }
const jsonSchema = new Draft07(myJsonSchema)
const {anyOf} = myJsonSchema
console.log(jsonSchema.errors.anyOfError({ pointer:'#', schema, value: myData, anyOf: JSON.stringify(anyOf) }))
// console.log(draft07Config.resolveAnyOf(jsonSchema,myData,myJsonSchema,"#"))
// console.log(anyOf)
const resolvedSchema = jsonSchema.resolveAnyOf(myData, myJsonSchema,"#");
// console.dir(resolvedSchema,{depth:null})