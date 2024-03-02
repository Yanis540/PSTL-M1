const json_migrte =require("json-schema-migrate")
const fs=require('fs')


function migrate(schema_migration_path : string,schema_path:string){
    try{
        // console.log(schema)
        const rawData = fs.readFileSync(schema_path, 'utf8');
        const schema = JSON.parse(rawData);
        // const s = schema
        json_migrte.draft2020(schema)
        fs.writeFile(schema_migration_path,JSON.stringify(schema,null,2),(err:any)=>{
            if(err)
                throw new Error(err)
        })
    }
    catch(err){
        throw new Error(err as any)
    }
}



export {
    migrate
}