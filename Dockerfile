# Utiliser une image de base officielle de Node.js version 20.9.0
FROM node:20.9.0

# Installer Python et pip
RUN apt-get update && \
    apt-get install -y python3 python3-pip && \
    apt-get clean
# Définir le répertoire de travail
WORKDIR /app

# Installer TypeScript et ts-node globalement
RUN npm install -g typescript ts-node
# Copier tout le contenu du projet dans le conteneur
COPY . .
RUN cd main && npm install 
RUN cd ../experiments && npm install 
# Retourner au répertoire /main
WORKDIR /app/main

# Cloner le dépôt Git et déplacer le dataset
RUN git clone -n --depth=1 --filter=tree:0 https://github.com/Yanis540/PSTL-M1-DATASET.git && \
    cd PSTL-M1-DATASET && \
    git sparse-checkout set --no-cone dataset && \
    git checkout && \
    cd .. && \
    mv PSTL-M1-DATASET/dataset dataset && \
    rm -rf PSTL-M1-DATASET

WORKDIR /app