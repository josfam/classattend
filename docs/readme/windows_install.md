# How to run the application locally on Windows

Note: These steps assume that you are using the built-in PowerShell command-line program

---

## Set up the frontend

> Note: Assumes that you already have [nodejs](https://nodejs.org/en/download/prebuilt-binaries) installed

### Install frontend dependencies

- Clone this repository, cd into the frontend directory, and install frontend dependencies

```sh
git clone https://github.com/josfam/classattend.git; if ($?) {cd .\classattend\frontend; if ($?) { npm install } }
```

### Setup environment variables

- Create a file named `.env` with environment variables necessary for the frontend

```sh
@"
VITE_BACKEND_API_URL='http://127.0.0.1:5000/'
VITE_AUTH_API_BASE_URL='api/v1/auth/'
"@ | sc .env
```

## Set up the backend

> Note: Assumes that you already have [python](https://www.python.org/downloads/) installed

### Install backend dependencies

- cd into the backend directory, create a virtual environment, activate it, and install python dependencies

```sh
cd ..\backend\; if ($?) { python -m venv venv-classattend; if ($?) { .\venv-classattend\Scripts\activate; if ($?) { pip install -r .\requirements.txt } } }
```

### Setup backend environment variables

- Create a file named `.env` with environment variables necessary for the backend

```sh
@"
DEV_DATABASE_URI_STRING='sqlite:///classattend.db'
DEV_CLIENT_ADDRESS='http://localhost:5173'
APP_ENVIRONMENT='development'
"@ | sc .env
```

## Start the backend sever

```sh
cd ..; if ($?) { python -m backend.api.v1.app }
```

## Start the frontend server (in a new PowerShell terminal)

Leave the backend server from the step above running, and instead:

- Open a new PowerShell terminal
- Navigate back to the frontend directory of this repository
- Start the frontend server with

```sh
npm run dev
```

- You should see output similar to this:

```sh
  VITE vX.X.X  ready in XXX ms

  ➜  Local:   http://localhost:5173/
  ➜  Network: use --host to expose
  ➜  press h + enter to show help
```

You can now copy the url (`http://localhost:5173/` in my case) to your browser to use the application.
