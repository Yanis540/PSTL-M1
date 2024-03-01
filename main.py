



schema_5="""

{'valid': False,
 'instanceLocation': '',
 'keywordLocation': '',
 'absoluteKeywordLocation': 'https://jschon.dev/demo#',
 'errors': [{'valid': True,
   'instanceLocation': '',
   'keywordLocation': '/type',
   'absoluteKeywordLocation': 'https://jschon.dev/demo#/type'},
  {'valid': True,
   'instanceLocation': '',
   'keywordLocation': '/properties',
   'absoluteKeywordLocation': 'https://jschon.dev/demo#/properties',
   'annotation': ['email', 'phone'],
   'annotations': [{'valid': True,
     'instanceLocation': '/email',
     'keywordLocation': '/properties/email',
     'absoluteKeywordLocation': 'https://jschon.dev/demo#/properties/email',
     'annotations': [{'valid': True,
       'instanceLocation': '/email',
       'keywordLocation': '/properties/email/type',
       'absoluteKeywordLocation': 'https://jschon.dev/demo#/properties/email/type'},
      {'valid': True,
       'instanceLocation': '/email',
       'keywordLocation': '/properties/email/format',
       'absoluteKeywordLocation': 'https://jschon.dev/demo#/properties/email/format',
       'annotation': 'email'}]},
    {'valid': True,
     'instanceLocation': '/phone',
     'keywordLocation': '/properties/phone',
     'absoluteKeywordLocation': 'https://jschon.dev/demo#/properties/phone',
     'annotations': [{'valid': True,
       'instanceLocation': '/phone',
       'keywordLocation': '/properties/phone/type',
       'absoluteKeywordLocation': 'https://jschon.dev/demo#/properties/phone/type'},
      {'valid': True,
       'instanceLocation': '/phone',
       'keywordLocation': '/properties/phone/pattern',
       'absoluteKeywordLocation': 'https://jschon.dev/demo#/properties/phone/pattern'}]}]},
  {'valid': False,
   'instanceLocation': '',
   'keywordLocation': '/allOf',
   'absoluteKeywordLocation': 'https://jschon.dev/demo#/allOf',
   'error': 'The instance is invalid against subschemas [0]',
   'errors': [{'valid': False,
     'instanceLocation': '',
     'keywordLocation': '/allOf/0',
     'absoluteKeywordLocation': 'https://jschon.dev/demo#/allOf/0',
     'errors': [{'valid': False,
       'instanceLocation': '',
       'keywordLocation': '/allOf/0/not',
       'absoluteKeywordLocation': 'https://jschon.dev/demo#/allOf/0/not',
       'error': 'The instance must not be valid against the subschema',
       'errors': [{'valid': True,
         'instanceLocation': '',
         'keywordLocation': '/allOf/0/not/required',
         'absoluteKeywordLocation': 'https://jschon.dev/demo#/allOf/0/not/required'}]}]},
    {'valid': True,
     'instanceLocation': '',
     'keywordLocation': '/allOf/1',
     'absoluteKeywordLocation': 'https://jschon.dev/demo#/allOf/1',
     'annotations': [{'valid': True,
       'instanceLocation': '',
       'keywordLocation': '/allOf/1/anyOf',
       'absoluteKeywordLocation': 'https://jschon.dev/demo#/allOf/1/anyOf',
       'annotations': [{'valid': True,
         'instanceLocation': '',
         'keywordLocation': '/allOf/1/anyOf/0',
         'absoluteKeywordLocation': 'https://jschon.dev/demo#/allOf/1/anyOf/0',
         'annotations': [{'valid': True,
           'instanceLocation': '',
           'keywordLocation': '/allOf/1/anyOf/0/required',
           'absoluteKeywordLocation': 'https://jschon.dev/demo#/allOf/1/anyOf/0/required'}]},
        {'valid': True,
         'instanceLocation': '',
         'keywordLocation': '/allOf/1/anyOf/1',
         'absoluteKeywordLocation': 'https://jschon.dev/demo#/allOf/1/anyOf/1',
         'annotations': [{'valid': True,
           'instanceLocation': '',
           'keywordLocation': '/allOf/1/anyOf/1/required',
           'absoluteKeywordLocation': 'https://jschon.dev/demo#/allOf/1/anyOf/1/required'}]}]}]}]}]}
"""