
mkdir -p input-data
mkdir -p input-data/persons
mkdir -p input-data/trees


# For persons

python3 scripts/json2bracket.py -f raw-data/persons/1.json  -s > input-data/persons/1.bracket
python3 scripts/json2bracket.py -f raw-data/persons/2.json  -s > input-data/persons/2.bracket


# For trees

python3 scripts/json2bracket.py -f raw-data/trees/1.json  -s > input-data/trees/1.bracket
python3 scripts/json2bracket.py -f raw-data/trees/2.json  -s > input-data/trees/2.bracket
python3 scripts/json2bracket.py -f raw-data/trees/3.json  -s > input-data/trees/3.bracket


