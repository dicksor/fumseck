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
* [X] Boutons responsive
* [X] Ajouter des sons
* [X] Transitions entre les questions
* [X] Page avec le classement
* [X] Ajouter droits d'auteurs dans about
* [ ] Ajouter image dans le formulaire
* [X] Sticky footer
* [X] Logo à la réponse d'une question
* [ ] Editer un quiz
* [X] Protéger les urls
* [X] Envoie du lien par node mailer
* [ ] Améliorer design et ajouter animations
* [X] Ecran de fin sur la télécommande 
* [ ] Ajout des logs
* [X] Régler le bouton quit game
* [X] Ajouter des labels au select
* [ ] Edit timer's timeout
* [ ] Aspect sécurité et triche