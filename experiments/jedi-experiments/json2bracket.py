

# The MIT License (MIT)
# Copyright (c) 2021 Thomas Huetter.
# 
# Permission is hereby granted, free of charge, to any person obtaining a copy
# of this software and associated documentation files (the "Software"), to deal
# in the Software without restriction, including without limitation the rights
# to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
# copies of the Software, and to permit persons to whom the Software is
# furnished to do so, subject to the following conditions:
# 
# The above copyright notice and this permission notice shall be included in
# all copies or substantial portions of the Software.
# 
# THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
# IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
# FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
# AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
# LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
# OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
# SOFTWARE.

"""json2bracket.py: Transforms a given JSON document into bracket notation."""

import sys
from argparse import ArgumentParser
import json
# JSON         | Python
# -------------+--------
# object       | dict
# array        | list
# string       | str
# number(int)  | int
# number(real) | float
# true         | True
# false        | False
# null         | None

sort_key = False

def json2bracket(x)->str:
    global sort_key
    result = ""

    if isinstance(x, dict):  # OBJECT
        result += '{\{\}'
        if sort_key:
            for key, val in sorted(x.items()):
                k = key.encode("ascii", "ignore").decode()
                result += '{"' + k.replace("{", "\{").replace("}", "\}") + '":'
                result += json2bracket(val)
                result += '}'
        else:
            for key, val in x.items():
                k = key.encode("ascii", "ignore").decode()
                result += '{"' + k.replace("{", "\{").replace("}", "\}") + '":'
                result += json2bracket(val)
                result += '}'
        result += '}'
    elif isinstance(x, list):  # ARRAY
        result += '{[]'
        cnt = 1
        for val in x:
            # Remove the comments below to insert array order nodes.
            # result += '{' + str(cnt)
            result += json2bracket(val)
            cnt += 1
            # result += '}'
        result += '}'
    else:  # VALUE
        if isinstance(x, str):
            x = x.encode("ascii", "ignore").decode()
            result += '{"' + "".join(x.replace("{", "\{").replace("}", "\{").split()) + '"}'
        elif isinstance(x, int):
            result += '{' + str(x) + '}'
        elif isinstance(x, float):
            result += '{' + str(x) + '}'
        elif isinstance(x, bool):
            result += '{' + str(x) + '}'
        else:  # NULL
            result += '{' + 'null' + '}'

    return result

def main():
    # Read command line arguments.
    parser = ArgumentParser(description='Input parameters for JSON to bracket \
                            notation converter.')
    parser.add_argument('-f', '--filename', type=str, required=True,
                        help='Filename/-path where the collection is stored.')
    parser.add_argument('-c', '--collection', default=False,
                        action='store_true', help='Parse a collection of JSON \
                        documents, i.e., surrounded by an array.')
    parser.add_argument('-s', '--sorted', default=False, action='store_true',
                        help='Sort key-value pairs by key.')
    parser.add_argument('-p', '--print', default=False, action='store_true',
                        help='Print the header with dataset info.')
    args = parser.parse_args()

    # Set flag to sort key-value pairs by key.
    global sort_key
    sort_key = args.sorted

    with open(args.filename) as json_file:
        data = json.load(json_file)
        records = len(data)

        # Print header with dataset statistics.
        if args.print:
            print("BRACKET NOTATION:")
            print("#record: " + str(records))
            print()

        # Based on input parameters either parse (1) a collection 
        # nested in an array or (2) a single document.
        if args.collection:
            for d in data:
                json2bracket(d)
                print()
        else:
            print(json2bracket(data))

    return

if __name__ == '__main__':
    main()