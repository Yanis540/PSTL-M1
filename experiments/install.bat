npm i json-schema-faker
 npm i json-schema-library

: Using JEDI
: make sure 
mkdir jedi
cd jedi
git clone https://github.com/DatabaseGroup/tree-similarity.git .
mkdir build
cd build
cmake ..

@REM ! ça ne marche pas donc au lieu de lance ça : 
cd src

g++ --std=c++17 -Inode -Ilabel -Icost_model -Iparser -Ited command_line/main.cc -o ted

@REM ! > ça va créer un executable qu'on pourra probablement exploiter 

: Install vcpkg > into C:>dev (for windows : https://www.studyplan.dev/pro-cpp/vcpkg-windows)
git clone https://github.com/Microsoft/vcpkg.git vcpkg 
.\vcpkg\bootstrap-vcpkg.bat
.\vcpkg integrate install
: go to env variables > path > add and add this : C:\dev\vcpkg
: run this vcpkg install tree-similarity 
npm install json-schema-migrate
npm i --save-dev @types/node