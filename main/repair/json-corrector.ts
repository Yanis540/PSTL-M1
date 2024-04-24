import { Draft07, Draft, JsonError } from "json-schema-library";

import myJsonSchema from "./data/6/json-schema.json";
import myData from "./data/6/data.json";
import jsf, { type Schema } from 'json-schema-faker';
// Function to correct invalid data based on schema and validation errors
function correctInvalidData(schema: Draft, invalidData: any, validationErrors: JsonError[]): any {
    let correctedData = { ...invalidData };
    // console.log(validationErrors)
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
        if (error.name === "TypeError" || error.name == "MultipleOfError" || error.name == "MinimumError") {
            //  console.log("here",error.name,lastKey,errorSchema)
            const value = generateFakerValue(errorSchema);
            parentObject[lastKey] = value
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
            const subSchemaErrors: JsonError[] = subSchema.validate(myData);
            
            const correctedSubSchema = correctInvalidData(subSchema, myData, subSchemaErrors);
            currentObject = {...currentObject,...correctedSubSchema}
            if (lastKey === '') {
                Object.assign(parentObject, correctedSubSchema);
            } else {
                Object.assign(parentObject[lastKey], correctedSubSchema);

            }
        
        }
        if(error.name =="OneOfError"){
            // choisir le premier schema 
            const selectedSchema = errorSchema.oneOf[0]; 
            const subSchema = new Draft07(selectedSchema);
            const subSchemaErrors: JsonError[] = subSchema.validate(myData);
            
            const correctedSubSchema = correctInvalidData(subSchema, myData, subSchemaErrors);
            currentObject = {...currentObject,...correctedSubSchema}
            if (lastKey === '') {
                Object.assign(parentObject, correctedSubSchema);
            } else {
                Object.assign(parentObject[lastKey], correctedSubSchema);

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
  


const jsonSchema: Draft = new Draft07(myJsonSchema);
const errors: JsonError[] = jsonSchema.validate(myData);
const correctedData = correctInvalidData(jsonSchema, myData, errors);

console.log("Corrected Data:", correctedData);