# Gestion des Utilisateurs avec Authentification et Stockage JSON

Ce projet est une application Spring Boot permettant de gérer l'inscription et l'authentification des utilisateurs. Les informations des utilisateurs, telles que leur nom, prénom, nom d'utilisateur et mot de passe (haché), sont stockées dans un fichier JSON.

## Fonctionnalités

* **Inscription des utilisateurs** :
  * Les utilisateurs peuvent s'inscrire avec leur prénom, nom, nom d'utilisateur, et mot de passe.
  * Les mots de passe sont sécurisés avec un hachage (BCrypt).
* **Authentification des utilisateurs** :
  * Connexion sécurisée avec `Basic Authentication`.
  * Accès restreint à certains endpoints uniquement après authentification.
* **Stockage JSON** :
  * Les données des utilisateurs sont stockées dans un fichier `users.json`.

## Technologies utilisées

* **Spring Boot** : Framework principal pour le back-end.
* **Spring Security** : Gestion de l'authentification et de la sécurisation des endpoints.
* **Jackson** : Pour lire et écrire les données dans un fichier JSON.
* **Lombok** : Simplifie le code en générant automatiquement les getters, setters, etc.
* **Java 17** : Version recommandée pour ce projet.

## Prérequis

* **Java** : Assurez-vous d'avoir installé Java 17 ou une version plus récente.
* **Maven** : Pour gérer les dépendances et compiler le projet.
* Un IDE comme **IntelliJ IDEA** (recommandé).

## Installation

1. Clonez ce dépôt dans votre machine locale :
   ```bash
   git clone https://github.com/votre-utilisateur/votre-projet.git
   ```
2. Accédez au dossier du projet :
   ```bash
   cd votre-projet
   ```
3. Compilez et démarrez l'application avec Maven :
   ```bash
   mvn spring-boot:run
   ```

## API Endpoints

### Inscription d'un utilisateur

* **Méthode** : `POST`
* **URL** : `/api/auth/register`
* **Exemple de corps de requête** :
  ```json
  {
    "firstName": "John",
    "lastName": "Doe",
    "username": "johndoe",
    "password": "password123"
  }
  ```
* **Réponse possible** :
  * `"User registered successfully!"` : En cas de succès.
  * `"Username already exists!"` : Si le nom d'utilisateur est déjà utilisé.

---

### Connexion à l'application

* **Méthode** : `GET`
* **URL** : Accédez à tout autre endpoint sécurisé avec `Basic Authentication`.
* **Authentification requise** :
  * Nom d'utilisateur : celui utilisé lors de l'inscription.
  * Mot de passe : celui défini lors de l'inscription.

---

### Liste des utilisateurs (Endpoint sécurisé)

* **Méthode** : `GET`
* **URL** : `/api/auth/users`
* **Réponse** :
  * Retourne la liste des utilisateurs enregistrés (nom, prénom, nom d'utilisateur, mot de passe haché).

---

## Fichier JSON généré

Les données des utilisateurs sont enregistrées dans un fichier nommé `users.json` dans le répertoire racine du projet.

Exemple de contenu du fichier :

```json
[
  {
    "firstName": "John",
    "lastName": "Doe",
    "username": "johndoe",
    "password": "$2a$10$6JqJxUErGPryOXXSxRwx6eIoKmQy5KsTbo4RpWpeu1/HMPNK5Ushe"
  }
]
```

## Sécurité

* **Hachage des mots de passe** : Les mots de passe des utilisateurs sont sécurisés avec l'algorithme BCrypt.
* **Spring Security** : Implémentation de `Basic Authentication` pour sécuriser les endpoints sensibles.
* **Validation des utilisateurs** : Empêche la duplication des noms d'utilisateur.

## Améliorations possibles

1. **Validation des mots de passe** : Ajouter des règles de validation (longueur minimale, caractères spéciaux, etc.).
2. **Modification/Suppression des utilisateurs** : Fournir des endpoints pour mettre à jour ou supprimer les utilisateurs.
3. **Base de données** : Remplacer le stockage JSON par une base de données comme MySQL ou PostgreSQL pour une meilleure gestion à grande échelle.

## Auteur

Créé par [Michel](https://github.com/mandarahades "git").

N'hésitez pas à poser des questions ou à proposer des améliorations !

## Licence

Ce projet est sous licence MIT. Vous êtes libre de l'utiliser, le modifier et le partager.
