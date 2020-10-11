Build from scratch

# Api
Must be run before bringing the container up
```
docker-compose run api
```

# Web
```
docker-compose run web /bin/bash -c 'cd .. && yarn create next-app app --example basic-css'
```
