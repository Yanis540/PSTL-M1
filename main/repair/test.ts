import { validateMaxAttemptsSchema } from "./json-corrector"
import fs from "fs"
export function validate(schema_path:string,data_path:string,result_path:string){
    try{
        const Scehma = fs.readFileSync(schema_path, 'utf8');
        const schema = JSON.parse(Scehma);
        const rawData = fs.readFileSync(data_path, 'utf8');
        const myData = JSON.parse(rawData);
        const {data,isValid,errors}=validateMaxAttemptsSchema(schema,myData)
        console.log("Corrected data : ",data)
        console.log("Is valid : ",isValid)
        if(!isValid)
            console.log(errors)
        
        fs.writeFile(result_path+"/corrected-data.json",JSON.stringify(data,null,2),(err:any)=>{
            if(err)
                throw new Error(err)
        })
        fs.writeFile(result_path+"/validity.json",JSON.stringify({isValid},null,2),(err:any)=>{
            if(err)
                throw new Error(err)
        })
    }
    catch (err){
        throw new Error(err as any)
    }
}
const DATA_PATH = __dirname+'/data'

const files = fs.readdirSync(DATA_PATH);
for(let i=0;i<files.length;i++){
    const file = files[i]
    validate(DATA_PATH+'/'+file+'/json-schema.json',DATA_PATH +'/'+file+'/data.json',DATA_PATH +'/'+file)
}

