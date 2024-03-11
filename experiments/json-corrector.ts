import { Draft07, Draft, JsonError } from "json-schema-library";

import myJsonSchema from "./validator/json-schema.json";
import myData from "./validator/data.json";
import jsf, { type Schema } from 'json-schema-faker';
// Function to correct invalid data based on schema and validation errors
function correctInvalidData(schema: Draft, invalidData: any, validationErrors: JsonError[]): any {
    const correctedData = { ...invalidData };
    console.log(validationErrors)
    validationErrors.forEach((error) => {
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
        if (error.name === "TypeError") {
            parentObject[lastKey] = generateFakerValue(errorSchema);
        }

        if (error.name === "RequiredPropertyError") {
            const missingProperty = error.data.key;
            if (errorSchema.type === "object" && !currentObject[missingProperty as any]) {
                currentObject[missingProperty as any] = generateFakerValue(errorSchema.properties[missingProperty as any]);
            }
        }
  });

  return correctedData;
}

function generateFakerValue(schema: Schema): any {
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
  


const jsonSchema: Draft = new Draft07(myJsonSchema);
const compiledSchema = jsonSchema.compileSchema(jsonSchema)
const errors: JsonError[] = jsonSchema.validate(myData,compiledSchema);
const correctedData = correctInvalidData(jsonSchema, myData, errors);

console.log("Corrected Data:", correctedData);