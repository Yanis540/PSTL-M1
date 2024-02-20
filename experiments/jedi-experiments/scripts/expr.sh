
# lancer les experiments 
mkdir -p results
mkdir -p results/persons
mkdir -p results/trees

echo "Experiment for persons 1 and 2"
./ted_delta.exe file input-data/persons/1.bracket input-data/persons/2.bracket 
./ted_delta.exe file input-data/persons/1.bracket input-data/persons/2.bracket  > results/persons/1-2.txt # save in the file 

echo "Experiment for persons 2 and 1"
./ted_delta.exe file input-data/persons/2.bracket input-data/persons/1.bracket 
./ted_delta.exe file input-data/persons/2.bracket input-data/persons/1.bracket  > results/persons/2-1.txt # save in the file 




#!  Trees 

echo "Experiment for trees 1 and 2"

./ted_delta.exe file input-data/trees/1.bracket input-data/trees/2.bracket 
./ted_delta.exe file input-data/trees/1.bracket input-data/trees/2.bracket  > results/trees/1-2.txt # save in the file 


echo "Experiment for trees 1 and 3"
./ted_delta.exe file input-data/trees/1.bracket input-data/trees/3.bracket 
./ted_delta.exe file input-data/trees/1.bracket input-data/trees/3.bracket  > results/trees/1-3.txt # save in the file 


echo "Experiment for trees 2 and 3"
./ted_delta.exe file input-data/trees/2.bracket input-data/trees/3.bracket 
./ted_delta.exe file input-data/trees/2.bracket input-data/trees/3.bracket  > results/trees/2-3.txt # save in the file 

