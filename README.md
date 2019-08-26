# Fumseck

Fluffy renaît de ses cendres

## Utilisation

### Site web

1. Installer les dépendances

```
npm install
```

2. Démarrer le serveur


```
npm start
```

3. Ajouter un package

```
npm install package-name --save
```

### Téléchargement de jeux de données 

1. Ce rendre dans le dossier util.
2. Dans la commande ci-dessous remplacer l'url et le nom de fichier

```
python download_oqdb_dataset.py --f oqdb_breaking_bad.json --u https://www.kiwime.com/oqdb/files/1036987992/OpenQuizzDB_036/openquizzdb_36.json --d "../app/model"
```

## TODO

* [ ] Hébérgeur
* [ ] Boutons responsive
* [ ] Ajouter des sons
* [ ] Transitions entre les questions
* [ ] Page avec le classement
* [ ] Ajouter droits d'auteurs dans about
* [ ] Ajouter image dans le formulaire
* [ ] Sticky footer
* [ ] Logo à la réponse d'une question
* [ ] Editer un quiz
* [ ] Protéger les urls
* [ ] Envoie du lien par node mailer
* [ ] Améliorer design et ajouter animations
* [ ] Ecran de fin sur la télécommande 