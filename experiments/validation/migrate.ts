const json_migrte  = require("json-schema-migrate")



function migrate(schema : any){
    try{
        const s = schema
        json_migrte.draft2020(s)
        console.log(JSON.stringify(s,null,2))
        // console.log("OK")
    }
    catch(err){
        throw new Error("Can't translate draft")
    }
}

  


export {
    migrate
}