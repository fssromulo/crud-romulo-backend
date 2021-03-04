# Crud Rômulo - Backend

Backend desenvolvido com Node.js utilizando express.js

## Instalação

Use gerenciador de pacotes/dependências [yarn](https://yarnpkg.com/) para carregar as dependências e pacotes do projeto.

```bash
yarn install
```

## Criação do banco de dados:

```mysql
DROP DATABASE IF EXISTS crud_romulo;
CREATE DATABASE crud_romulo;
USE crud_romulo;

CREATE TABLE IF NOT EXISTS person(
   id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
   name VARCHAR(150) NOT NULL,
   email VARCHAR(100) NOT NULL,
   password VARCHAR(100) NOT NULL,
   permission VARCHAR(30),
   phone VARCHAR(50)
) ENGINE = INNODB;

INSERT INTO person VALUES (NULL, "Admin Crud Romulo", "admin@admin.com" , "$2a$08$DxIqpP4Td4olhye9hj9m2ehtUHsWa2yXGzajFYXfowtkWYkUa1qt2", "admin", "47988715258");
```
