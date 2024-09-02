# Real-Time Stock Tracker

## Structure

This project is setup as a mono-repo using yarn workspaces:
```
root
|
- package.json
- yarn.lock
- packages
  |
  -  back-end
     |
     - package.json
  |
  -  front-end
     |
     - package.json
```

## Libraries / frameworks used

- [React-Admin](https://marmelab.com/react-admin/)
- [React](https://reactjs.org/)
- [NestJS](https://nestjs.com/)
- [TypeORM](https://typeorm.io/)
- [Tiingo](https://www.tiingo.com/)
- [Socket.io](https://socket.io/)
- [JWT](https://jwt.io/)

## Setup

### Create .env.local file at root with the following values

```
DB_HOST=127.0.0.1
DB_PORT=3306
DB_USERNAME=root
DB_PASSWORD=
DB_NAME=stock_tracker
GENERATE_SOURCEMAP=false
JWT_SECRET=[insert random string]
TIINGO_KEY=[insert api key from tiingo.com here]
GENERATE_SOURCEMAP=false
DEBUG=nestjs:*
```

### Install dependencies and run migrations

- Install nvm (e.g. on mac: `brew install nvm` - make sure to add the appropriate pieces to your bash profile so nvm autoloads when changing directories)
- Navigate to project and run `nvm install` to install the current node version
- Install yarn (e.g. on mac: `npm install --global yarn`)
- Install packages `yarn install`
- To run migrations and setup the db (the empty database should be created manually before this), call `yarn migrate`
- When you change an entity, you can auto-generate migrations with `yarn generate-migrations`

## Running locally

- Run `yarn start` from the root and you're good to go!
- If you need to run a command (like adding a new package to the front-end), you can do so from the root of the project with yarn workspaces, ex: `$ yarn workspace front-end add @some-new-package-to-install`