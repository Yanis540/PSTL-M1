
echo "Experiment for persons 1 and 2"
./ted.exe file input-data/persons/1.bracket input-data/persons/2.bracket 
./ted.exe file input-data/persons/1.bracket input-data/persons/2.bracket  > results/persons/1-2.txt # save in the file 

echo "Experiment for persons 2 and 1"
./ted.exe file input-data/persons/2.bracket input-data/persons/1.bracket 
./ted.exe file input-data/persons/2.bracket input-data/persons/1.bracket  > results/persons/2-1.txt # save in the file 





