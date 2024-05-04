import { Draft07, Draft, JsonError } from "json-schema-library";


import jsf, { type Schema } from 'json-schema-faker';
// Function to correct invalid data based on schema and validation errors
function correctInvalidData(schema: Draft, invalidData: any, validationErrors: JsonError[]): any {
    let correctedData = Array.isArray(invalidData)? invalidData : { ...invalidData };
    validationErrors?.forEach((error) => {
        const { pointer, schema: errorSchema, value, received, expected } = error.data;
        // Splitting the pointer to navigate the data object
        const path = pointer.substring(2).split('/');
        let currentObject = correctedData;
        let parentObject = correctedData;
        let lastKey = "";
        for (let i = 0; i < path.length; i++) {
            const key = path[i];

            // Check if the current key is an array index
            const index = parseInt(key, 10);
            
            if (!isNaN(index) && Array.isArray(currentObject)) {
                parentObject = currentObject;
                lastKey = key;
                currentObject = currentObject[index];
            } else {
                parentObject = currentObject;
                if(key.trim()){
                    lastKey = key;
                    currentObject = currentObject[key];
                }
            }
        }
        // Handle different error types
        if (error.name === "TypeError" || error.name == "MultipleOfError" || error.name == "MinimumError") {
            const value = generateFakerValue(errorSchema);
            if (lastKey !== '' && parentObject && typeof parentObject[lastKey] === 'object') {
                parentObject[lastKey]= value;
            } else {
                if(lastKey!="")
                    parentObject[lastKey] = value;
                else 
                    correctedData = value
            }
        }
        if (error.name === "RequiredPropertyError") {
            const missingProperty = error.data.key;
            if (errorSchema.type === "object" && !currentObject[missingProperty as any]) {
                currentObject[missingProperty as any] = generateFakerValue(errorSchema.properties[missingProperty as any]);
            }
        }
        if(error.name =="AnyOfError"){
            // choisir le premier schema 
            const selectedSchema = errorSchema.anyOf[0]; 
            const subSchema = new Draft07(selectedSchema);
            const subSchemaErrors: JsonError[] = subSchema.validate(currentObject);
            
            const correctedSubSchema = correctInvalidData(subSchema, currentObject, subSchemaErrors);
            if (lastKey !== '' && typeof parentObject[lastKey] === 'object') {
                if(schema.getSchema()!=undefined && schema.getSchema()!.type=='array')
                    parentObject[lastKey] = correctedSubSchema
                else 
                    Object.assign(parentObject[lastKey], correctedSubSchema);
            } else {
                if(lastKey!="")
                    parentObject[lastKey] = correctedSubSchema;
                else 
                    correctedData = correctedSubSchema
            }
        
        }
        if(error.name =="OneOfError"){
            // choisir le premier schema 
            const selectedSchema = errorSchema.oneOf[0]; // Sélectionnez le schéma correspondant à cet index
            const subSchema = new Draft07(selectedSchema);
            const subSchemaErrors: JsonError[] = subSchema.validate(currentObject); // Validez uniquement cet élément
            const correctedSubSchema = correctInvalidData(subSchema, currentObject, subSchemaErrors);
            if (lastKey !== '' && typeof parentObject[lastKey] === 'object') {
                if(schema.getSchema()!=undefined && schema.getSchema()!.type=='array')
                    parentObject[lastKey] = correctedSubSchema
                else 
                    Object.assign(parentObject[lastKey], correctedSubSchema);
            } else {
                if(lastKey!="")
                    parentObject[lastKey] = correctedSubSchema;
                else 
                    correctedData = correctedSubSchema
            }
          
        
        }
        if (error.name === "NoAdditionalPropertiesError") {
            const additionalProperty = error.data.property as any;
            // Check if the additional property is not required
            if (!(additionalProperty in errorSchema.properties) || !errorSchema.required.includes(additionalProperty)) {
                // Remove the additional property
                if (lastKey === '') {
                    delete parentObject[additionalProperty];
                } else {
                    delete parentObject[lastKey][additionalProperty];
                }
            }
        }
  });
  return correctedData;
}

function generateFakerValue(schema: Schema): any {
    if(!schema)
        return null 
    switch (schema.type){
        case "string": {
            return jsf.generate({...schema,type:"string"});
        }
        case "integer" : 
            return jsf.generate({...schema,type:"integer"});
        case "number" : 
            return jsf.generate({...schema,type:"number"});
        case "boolean" : 
            return jsf.generate({...schema,type:"boolean"});
        case "array" : {
            return [generateFakerValue(schema.items)];
        }
        case "object" : {
            const generatedObject = {} as any;
            Object.keys(schema.properties).forEach((key) => {
                generatedObject[key] = generateFakerValue(schema.properties[key]);
            });
            return generatedObject;
        }
        default : 
            return null; // Default value for unknown types
    } 

  
}
  





function validate(schema:any,data:any){
    const jsonSchema: Draft = new Draft07(schema);
    const errors: JsonError[] = jsonSchema.validate(data);
    const correctedData = correctInvalidData(jsonSchema, data, errors);
    const correctedErrors : JsonError[] = jsonSchema.validate(correctedData)
    return {data:correctedData,isValid:correctedErrors.length === 0,errors:correctedErrors }
}
const MAX_ATTEMPTS = 2; 

export function validateMaxAttemptsSchema(schema:any,inputData:any){
    let attempts =0 ; 
    let data:any,isValid:boolean=false,errors:any;
    while(attempts<MAX_ATTEMPTS){

        const {data:d,isValid:v,errors:e}= validate(schema,inputData);
        data = d; 
        errors = e; 
        isValid = v; 
        if(isValid)
            break
        attempts ++
    }
    return {data:data,isValid:isValid,errors}
}

