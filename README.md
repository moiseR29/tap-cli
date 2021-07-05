# TAP CLI

## Historia

Cuando me toco ser parte de Tap, cree este pequeño paquete, que te permitia levantar todo el ambiente de microservicios con un comando :D

## USAGE

### Oneline

enter `tap --username your_username --key your_key --connection your_connection --password your_password` in console

```
Example

 tap --username mrebatta --key ~/.ssh/mrebatta@auntap.com --connection db-core
```

### Menu

enter `tap` in console

1. please select your private key **_ => select private key, if not view, if you don't see it please copy the key to your .ssh folder _**
2. please write your username **_ => Enter username, user of remote host _**
3. Select connect

   - **_db => only Database _**
   - **_db-em => Database and Event Manager _**
   - **_db-core => Database and all Core_**

4. please enter your password **_ => if necessary, usually in windows, enter your passphare, Default '' _**

```
Example

tap
? please select your private key mrebatta@auntap.com
? please write your username mrebatta
? Select connect db-core
? please enter your password
```

### Migration

To generate the files with db-migrate enter the following
`tap --migrate --create mi-migration` in console, within the path of your project

To up migrations with db-migrate enter the following
`tap --migrate --up` in console, within the path of your project

To down migrations with db-migrate enter the following
`tap --migrate --down` in console, within the path of your project