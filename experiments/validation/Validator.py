from jschon import create_catalog,JSON, JSONSchema
import json,os
from jschon.jsonschema import Result
keywords_to_avoid = [
    'not','anyOf','oneOf','allOf','properties','patternPropreties','items',
    'additionalProperties','contains','unevaluatedProperties','prefixItems', 'unevaluatedItems'
]
class Validator : 
    def __init__(self) -> None:
        create_catalog('2019-09')
        
    
    def extract_errors_map(self,error:dict, error_map:dict):
        # print(error)
        # if there's errors in subschema treat them since they are the origin of the error  
        keywordLocation = str(error['keywordLocation'])
        key = keywordLocation.split('/')[-1]
        if 'errors' in error:
            if key in  keywords_to_avoid :
                if error_map.get(key) is None : 
                    error_map[key]=[error['error'] if 'error' in error else '']
                else : 
                    error_map[key].append(error['error'] if 'error' in error else '') 
            for e in error['errors']:
                self.extract_errors_map(e, error_map)
        else : 
            # if key not in keywords_to_avoid:
            if error_map.get(key) is None : 
                error_map[key]=[error['error'] if 'error' in error else '']
            else : 
                error_map[key].append(error['error'] if 'error' in error else '') 
        
            
    def extract_errors(self,errors): 
        error_map= {}
        for error in errors : 
            self.extract_errors_map(error,error_map)
        return list(error_map.keys())
    def validate_instance(self,schema_dir:str,instance_dir) -> Result: 
        with open(schema_dir,'r',encoding='utf-8') as f : 
            schema= json.load(f)
        demo_schema = JSONSchema(schema)
        # print(demo_schema)
        with open (instance_dir,'r',encoding='utf-8') as f : 
            instance=json.load(f)
            
        result = demo_schema.evaluate(
            JSON(instance)
        )
        return result 
    def get_errors_validation(self,schema_dir:str,instance_dir:str,output_details='detailed'): 
        try:
            result = self.validate_instance(schema_dir,instance_dir)
            # print(result.output('detailed'))# if errors in result.output('detailed')
            if(result.output("detailed")['valid']==False or "errors" in result.output("detailed")): 
                errors = self.extract_errors(result.output('detailed')['errors'])
            else : 
                errors=[]
            return errors
        except : 
            return []
