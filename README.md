# classattend

An online attendance management application for a university context.
This is also my class project for the Distributed Systems class (BIT 322) at Cavendish University, Uganda

---

## Table of contents

- [Technologies used](#technologies-used)
  - [Backend](#backend)
  - [Frontend](#frontend)
- [How to run the application (unix)](#how-to-run-the-application-unix-systems-ie-linux-and-mac)

## Technologies used

### Frontend

![Frontend tools](./docs/readme/images/frontend.png)

On the frontend, I currently use:

- [React](https://react.dev/)
- [Tailwind](https://react.dev/) for css styles
- [shadcn](https://ui.shadcn.com/) for ui components
- [zustand](https://zustand.docs.pmnd.rs/getting-started/introduction) for application state

## Backend

![Backend](./docs/readme/images/backend.png)

On the backend, I currently use:

- [Flask](https://flask.palletsprojects.com/en/stable/) for  the application server
- [FlaskSQLAlchemy](https://flask-sqlalchemy.readthedocs.io/en/stable/), that uses [SQLAlchemy](https://www.sqlalchemy.org/) to communicate with a small [SQLite3](https://www.sqlite.org/index.html) database

## How to run the application (unix systems i.e. Linux and Mac)

- Clone this repository and cd into the frontend directory

```sh
git clone https://github.com/josfam/classattend.git
cd classattend/frontend
```

- Install frontend dependencies (Counts on [nodejs](https://nodejs.org/en/download/package-manager) being already installed)

```sh
npm install
```

- Setup the frontend environment variables
  - Create a file named `.env`

  ```sh
  touch .env
  ```

  - ... and paste these contents into it

  ```sh
  VITE_BACKEND_API_URL='http://127.0.0.1:5000/'
  VITE_AUTH_API_BASE_URL='api/v1/auth/'
  ```

- Install backend dependencies (Counts on [python](https://www.python.org/downloads/) being already installed)
  - cd into the backend directory, create a virtual environment, activate it, and install python dependencies

    ```sh
    cd ../backend
    python3 -m venv venv-classattend
    source venv-classattend/bin/activate
    pip install -r requirements.txt
    ```

- Setup the backend environment variables
  - Create a file named `.env`

  ```sh
  touch .env
  ```

  - ... and paste these contents into it

  ```sh
  DEV_DATABASE_URI_STRING="sqlite:///classattend.db"
  DEV_CLIENT_ADDRESS="http://localhost:5173"
  APP_ENVIRONMENT="development"
  ```

- Start the backend and frontend servers in two separate terminals

  - In the same terminal from before start the backend server

    ```sh
    cd ..
    python3 -m backend.api.v1.app
    ```

  - Open a new terminal, navigate to the frontend directory of the repository, and start the frontend

    ```sh
    npm run dev
    ```

  - Copy and paste the url displayed in the frontend terminal in a browser. It should look something like this:

    ```sh
    http://localhost:5173/
    ```
