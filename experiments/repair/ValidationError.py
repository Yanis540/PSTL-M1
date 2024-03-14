class ValidationError:
    def __init__(self, error):
        self.error = error

class TypeValidationError(ValidationError):
    pass

class ValueMinimumError(ValidationError):
    pass

class ValueMaximumError(ValidationError):
    pass

class EnumError(ValidationError):
    pass

class PatternError(ValidationError):
    pass
class PatternPropertiesError(ValidationError):
    pass

class RequiredPropertyError(ValidationError):
    pass

class AdditionalPropertyError(ValidationError):
    pass

class MultipleOfError(ValidationError):
    pass

class MinLengthError(ValidationError):
    pass

class MaxLengthError(ValidationError):
    pass

class UniqueItemsError(ValidationError):
    pass

class DependencyError(ValidationError):
    pass

class FormatError(ValidationError):
    pass

class AnyOfError(ValidationError):
    pass

class OneOfError(ValidationError):
    pass

class AllOfError(ValidationError):
    pass
class ContainsError(ValidationError):
    pass

class UnevaluatedPropertiesError(ValidationError):
    pass

class ItemsError(ValidationError):
    pass

class UnevaluatedItemsError(ValidationError):
    pass

class PrefixItemsError(ValidationError):
    pass
class MinPropertiesError(ValidationError):
    pass
class MaxPropertiesError(ValidationError):
    pass

# Définir une fonction pour extraire les erreurs et les annoter
def annotate_errors(errors):
    annotated_errors = []
    for error in errors:
        keyword_location = str(error.get("keywordLocation", ""))
        if keyword_location.endswith("/type"):
            annotated_errors.append(TypeValidationError(error))
        elif keyword_location.endswith("/minimum"):
            annotated_errors.append(ValueMinimumError(error))
        elif keyword_location.endswith("/maximum"):
            annotated_errors.append(ValueMaximumError(error))
        elif keyword_location.endswith("/enum"):
            annotated_errors.append(EnumError(error))
        elif keyword_location.endswith("/pattern"):
            annotated_errors.append(PatternError(error))
        elif keyword_location.endswith("/patternProperties"):
            annotated_errors.append(PatternPropertiesError(error))
        elif keyword_location.endswith("/required"):
            annotated_errors.append(RequiredPropertyError(error))
        elif keyword_location.endswith("/additionalProperties"):
            annotated_errors.append(AdditionalPropertyError(error))
        elif keyword_location.endswith("/multipleOf"):
            annotated_errors.append(MultipleOfError(error))
        elif keyword_location.endswith("/minLength"):
            annotated_errors.append(MinLengthError(error))
        elif keyword_location.endswith("/maxLength"):
            annotated_errors.append(MaxLengthError(error))
        elif keyword_location.endswith("/uniqueItems"):
            annotated_errors.append(UniqueItemsError(error))
        elif keyword_location.endswith("/dependencies"):
            annotated_errors.append(DependencyError(error))
        elif keyword_location.endswith("/format"):
            annotated_errors.append(FormatError(error))
        elif keyword_location.endswith("/anyOf"):
            annotated_errors.append(AnyOfError(error))
        elif keyword_location.endswith("/oneOf"):
            annotated_errors.append(OneOfError(error))
        elif keyword_location.endswith("/allOf"):
            annotated_errors.append(AllOfError(error))
        elif keyword_location.endswith("/contains"):
            annotated_errors.append(ContainsError(error))
        elif keyword_location.endswith("/unevaluatedProperties"):
            annotated_errors.append(UnevaluatedPropertiesError(error))
        elif keyword_location.endswith("/items"):
            annotated_errors.append(ItemsError(error))
        elif keyword_location.endswith("/unevaluatedItems"):
            annotated_errors.append(UnevaluatedItemsError(error))
        elif keyword_location.endswith("/prefixItems"):
            annotated_errors.append(PrefixItemsError(error))
        elif keyword_location.endswith("/minProperties"):
            annotated_errors.append(MinPropertiesError(error))
        elif keyword_location.endswith("/maxProperties"):
            annotated_errors.append(MaxPropertiesError(error))
        else:
            annotated_errors.append(ValidationError(error))
    return annotated_errors