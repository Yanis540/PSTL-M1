import { Draft04, Draft06, Draft07, Draft, JsonError ,resolveAllOf} from "json-schema-library";
import myJsonSchema from "./dataset/3/schema.json";
import myData from "./dataset/3/instance.json";

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
    switch (true) {
        case !!schema.anyOf:
            return validateAnyOf(schema.anyOf, data);
        case !!schema.allOf:
            return validateAllOf(schema.allOf, data);
        case !!schema.oneOf:
            return validateOneOf(schema.oneOf, data);
        case !!schema.not:
            return validateNot(schema.not, data);
        case !!schema.patternProperties:
            return validatePatternProperties(schema.patternProperties, data);
        default:
            return [];
    }
}


function validateAnyOf(anyOf: any[], data: any): JsonError[] {
    const subSchemaErrors: JsonError[] = [];
    anyOf.forEach((subSchema: any) => {
        const subErrors = new Draft07(subSchema).validate(data);
        if (subErrors.length > 0) {
            subSchemaErrors.push(...subErrors);
        }
    });
    return subSchemaErrors;
}

function validateAllOf(allOf: any[], data: any): JsonError[] {
    const subSchemaErrors: JsonError[] = [];
    allOf.forEach((subSchema: any) => {
        const subErrors = new Draft07(subSchema).validate(data);
        if (subErrors.length === 0) {
            // Si aucune erreur n'est trouvée avec ce sous-schéma, arrêtez la validation et retournez un tableau vide
            return [];
        } else {
            subSchemaErrors.push(...subErrors);
        }
    });
    return subSchemaErrors;
}

function validateOneOf(oneOf: any[], data: any): JsonError[] {
    let validCount = 0;
    let errorsFound = false;
    const subSchemaErrors: JsonError[] = [];
    oneOf.forEach((subSchema: any) => {
        const subErrors = new Draft07(subSchema).validate(data);
        if (subErrors.length === 0) {
            validCount++;
        } else {
            subSchemaErrors.push(...subErrors);
            errorsFound = true;
        }
    });
    if (validCount !== 1 || errorsFound) {
        // Si aucun ou plus d'un sous-schéma est valide, ou si des erreurs ont été trouvées avec tous les sous-schémas, retournez les erreurs
        return subSchemaErrors;
    }
    return [];
}

function validateNot(notSchema: any, data: any): JsonError[] {
    const subErrors = new Draft07(notSchema).validate(data);
    console.log(">>>>>>>>>>>>>>>>>>>>")
    console.log(subErrors)
    console.log(">>>>>>>>>>>>>>>>>>>>")
    if (subErrors.length === 0) {
        return [{
            name: "NotError",
            code: "not-error",
            message: "Data should not validate against this schema",
            data: { schema: notSchema, value: data } 
        } as any];
    }
    return [];
}

function validatePatternProperties(patternProperties: any, data: any): JsonError[] {
    const subSchemaErrors: JsonError[] = [];
    const properties = Object.keys(patternProperties);
    properties.forEach((pattern: string) => {
        const regex = new RegExp(pattern);
        Object.keys(data).forEach((key: string) => {
            if (regex.test(key)) {
                const subErrors = new Draft07(patternProperties[pattern]).validate(data[key]);
                subSchemaErrors.push(...subErrors.map(error => ({
                    ...error,
                    data: { schema: patternProperties[pattern], value: data[key] }
                })as any));
            }
        });
    });
    return subSchemaErrors;
}