# Node.js Api Demo

Create app

```cmd
npm init -y
```

Install module express

```cmd
npm install express
```

## Environment Varaiables

Use module dotenv  https://www.npmjs.com/package/dotenv

```cmd
npm install dotenv
```
Add file .env whit variables, add .env to .gitignore

```properties
DB_HOST="MYHOSTQA"
DB_PORT="1000"
DB_USERNAME="myuser"
DB_PASSWORD="*******"
```

## Docker

Create dockerfile, build and run:

```cmd
docker build -t mzavaletav/apinodedemo:1 .
docker run -p 3000:3000 -e DB_HOST=HOST_DOCKER -e DB_USERNAME=myuser -e DB_PORT=1234 -e DB_PASSWORD="*****" mzavaletav/apinodedemo:1
```

Push image en container registry dockerhub (login optional):
```cmd
docker push mzavaletav/apinodedemo:1
```

## Kubernetes

Add manifest: service.yml
Set the current namespace, using:
```cmd
kubectl config set-context --current --namespace=my-namespace
```
Review:

```cmd
kubectl config view | grep namespace
```


If container registry is private, add secret to cluster, by use dockerhub not use arg  --docker-server
docker-registry parameter = imagePullSecrets name in service.yml
```cmd
kubectl create secret docker-registry cr-mzavaletav --docker-server='user.mycr.io' --docker-username='mzavaletav' --docker-password='*******'
``` 

Create deployment and service in k8s:
```cmd
kubectl apply -f service.yml
```

get port by test, using *kubectl get svc apinodedemo-nodeport*

```cmd
kubectl get svc apinodedemo-nodeport
NAME                   TYPE       CLUSTER-IP      EXTERNAL-IP   PORT(S)          AGE
apinodedemo-nodeport   NodePort   10.103.65.166   <none>        3000:32671/TCP   3m29s
```

Try using the address of any of the cluster nodes and the exposed port 32671

```cmd
curl localhost:32671

{"hostname":"apinodedemo-c4d8784b5-l6rqk","os":{"platform":"linux","release":"5.10.124-linuxkit"},"port":3000,"database":{"url":"HOST_K8S","port":"1500","username":"myusername","password":"*************"}}    
```

