# Friday Planner

## Overview

Esta es una aplicación de React que utiliza Vite para un desarrollo más rápido y optimización de las builds.

La idea de esta aplicación es poder ayudar al usuario a planear su noche de viernes y crear una experiencia que le ayude a salir de su rutina.

Para dar una experiencia más emergente, he puesto una escena 3D interactiva que me pareció interesante. Para iniciar, simplemente dar click al juego de **Friday Planner**.

La aplicación tiene un aspecto retro-gaming; posterior al interactuar con el juego, se verá una transición un tanto clásica para algunos gamers.

Friday planner tiene como meta contribuir con ideas y así facilitar la toma de decisiones.
Para hacerlo un tanto interactivo cree un dashboard que tiene diferentes widgets como: La clásica to-do list, ciertas cartas con opciones básicas, películas destacadas, reloj, clima, spotify player.

## Features

- **Integracion con Spline 3D**: Escena condicional de Spline 3D, lazy loaded y con spinner para mejorar UX.
- **React Router**: Client-side routing con `react-router-dom`.
- **Clasica Todo list**: Se pueden generar nuevos elementos y eliminarlos.
- **Cartas interactivas**: Estas cartas ayudan con la toma de decisiones básicas, al interactuar con ellas, se abrirá un menú con opciones predefinidas.
- **Reloj Digital**: Reloj con hora local.
- **Películas Destacadas**: Películas destacadas, con opcion de guardar elección a la todo list.
- **Clima Local**: El usuario puede escoger una ciudad y poder ver el clima actual.
- **LocalStorage**: Se hace el uso del local storage para guardar todos los inputs del usuario.

## Installation

### Prerequisites

Asegurarse de tener los siguientes programas instalados en tu máquina local.

- [Node.js](https://nodejs.org/)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)

### Instalar Dependencias

1. Clonar el repositorio:

```bash
git clone https://github.com/Jachacon12/fun-friday-planner.git
```

2. Navegar a la carpeta principal:

```bash
cd fun-friday-planner
```

3. Instalar dependencias:

Si utiliza npm:

```bash
npm install
```

O si utiliza Yarn:

```bash
yarn install
```

## Usage

Para comenzar la aplicacion en modo de desarrollo

```bash
npm run dev
    o
yarn install
```

La aplicacion estara disponible en: http://localhost:3000.

## Environmental Variables

Esta aplicación utiliza 2 environmental keys, que son utilizadas para la información de los widgets del clima y las películas:

```ini
# .env
VITE_WEATHER_API
VITE_MOVIES_API
```

> Atencion  
> Para que la aplicación funcione correctamente, es necesario tener las API keys

### Autor

Jorge Chacon
