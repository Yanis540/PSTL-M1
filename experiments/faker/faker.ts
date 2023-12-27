import jsf, { type Schema } from 'json-schema-faker';

const schema :Schema= {
    type: 'object',
    properties: {
        name: { type: "string" },
        birthday: { type: "string",format: "date" },
        age: { type: "integer" ,minimum : 0 , maximum : 10}, 
        regulation:{
            type:"object",
            properties:{

                name:{type:"string"}, 
                role:{type:"string"} 
            }, 
            required:["role"]
        }
    }, 
    required:["name","birthday","age","regulation"]
  };



const syncValue = jsf.generate(schema);

console.log(syncValue)