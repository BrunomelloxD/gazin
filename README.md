# Gazin Tech
## Subindo a aplicação

### Back-end
Entre na pasta da aplicação:
```
cd gazin/desafio-full-stack-gazin-tech
```
Gere o build:
```
docker build -t gazin-api .
```
Rode o container:
```
docker-compose up
```

### Front-end
Entre na pasta da aplicação:
```
cd gazin/desafio-full-stack-gazin-tech-front
```
Gere o build:
```
docker build -t gazin-front .
```
Rode o container:
```
docker run --network host -p 5173:5173 gazin-front
```
Acesse: http://localhost:5173/
