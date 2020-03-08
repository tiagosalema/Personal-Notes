# Build

`docker build .` builds just normally

Flags:

+ `-t tiagosalema/myProject:latest` put between `build` and `.` to tag the build and use its name instead of id



# Docker-compose

If we open a server in the `index.js` (say, redis) and we run `npm start`, docker will complain that the server redis isn't running. Even if we run redis in an independent command line, it will still complain. This happens because these servers are actually 2 completely independent containers that don't have access to each other. What we have to do here is compose these 2 `services` by using the docker-compose, which will establish a connection between them:

```yml
version: "3"
services:
  redis-server:
    image: "redis"
  node-app:
    build: .
    ports:
      - "4001:8081"
```

Now, we just need to specify `redis-server` as being the host when we create the redis client in `index.js`:

```javascript
const client = redis.createClient({
  host: "redis-server",  // usually the host is http://www.mysite.com
  port: 6379						// default port
});
```

It is possible to make a project reload using docker-compose as well:

```yml
version: "3"
services:
  web:				// call it whatever you want
    build:
      context: .
      dockerfile: Dockerfile.dev
    ports:
      - "3000:3000"
    volumes:
      - /app/node_modules 		// node_modules exists already in the image, so we dont reference it
      - .:/app
```



# Random notes

If the react app is not reloading, create an `.env` file and write `CHOKIDAR_USEPOLLING=true`

# Useful commands

| Command                  |                            Action                            |
| ------------------------ | :----------------------------------------------------------: |
| `docker run xxx .`       | Executes default code of `xxx` (the one after `CMD`) (`xxx` can be id) |
| `docker run xxx yyy`     |           Overrides `xxx` default command to `yyy`           |
| `-it`                    |             Keeps the code running all beautiful             |
|                          |                                                              |
| `docker exec xxx`        | Executes a command on top of the container being currently executed |
| `docker ps`              |               Shows all the running containers               |
| `docker build .`         |                                                              |
| `-f Dockerfile.dev`      |  with a different `f`ilename; it is written before the `.`   |
| `docker run containerID` |                                                              |
| `-p 3000:3000`           |   Exposes port 3000 of the container to the local machine    |
| `docker stop xxx`        |              Stops the container with id `xxx`               |
| `docker-compose up`      | Puts all the services specified under `docker-compose.yml` running |
| `--build`                |           When we want to rebuild `docker-compose`           |
| `docker-compose down`    |         Stops all containers of `docker-compose.yml`         |

