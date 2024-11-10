# How to run the application locally on unix systems i.e. Linux and Mac

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
