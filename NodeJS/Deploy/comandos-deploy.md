# Configurando servidor 

Acessar o servidor
```
ssh root@0.0.0.0 (pegar o IP no cloud)
```

Quando criar e iniciar o servidor pela primeira vez, atualiza-lo:
```
apt update
apt upgrade
```

Adicionar usuario:
```
adduser deploy
```

Dar direitos ao usuario:
```
usermod -aG sudo deploy
```

Logar direto no usuario deploy:
```
cd /home/deploy/
mkdir .ssh
cd .ssh/
cp ~/.ssh/authorized_keys .  // Copia o arquivo da pasta(~/.ssh/authorized_keys) para a pasta local
chown deploy:deploy authorized_keys // troca o usuario que executa o arquivo
```

Sair do servidor:
```
exit
```

Instalar NodeJS: (Ver site)
```
curl -sL https://deb.nodesource.com/setup_10.x | sudo -E bash - 
sudo apt-get install -y nodejs
```

# Configurando aplicação 

Clonar o projeto na raiz:
```
git clone https://github.com/LucasMSnts/projeto.git
```

Entrar no projeto e instalar as dependencias:
```
cd projeto
npm install
```

Configurar o .env
```
cp .env.example .env
vim .env
```

Alterar o node_env para produção
```
NODE_ENV=production
```

# Criando serviços 
Habilitar o docker para o usuario "deploy":
```
sudo groupadd docker
sudo usermod -aG docker $USER
```

Baixar e configurar o container do Postgres:
```
docker run --name postgres -e POSTGRES_PASSWORD=bootcampdeploy -p 5432:5432 -d -t postgres
```

Baixar e configurar o container do MongoDB:
```
docker run --name mongo -p 27017:27017 -d -t mongo
```

Baixar e configurar o container do Redis: (versão mais limpa)
```
docker run --name redis -p 6379:6379 -d -t redis:alpine
```


##### Entrar no Postgres pelo docker:
	
	docker exec -i -t postgres /bin/sh
	

##### Acessar o usuario postgres (usuario padrão do Postgres)
	
	su postgres
	

##### Acessar as "tabelas" do Postgres
	
	psql
	
	
###### Criar banco de dados:

	CREATE DATABASE bootcampnodejs;
	
		
###### Sair das "tabelas"
	
	\q
		
	
###### Sair do usuario postgres e do Postgres
	
	exit
	exit
	
	
# Rodando servidor 

Adicionar a build no projeto e iniciar-lo:
```
"build": "sucrase ./src -d ./dist --transforms imports",
"start": "node dist/server.js"
```
	
Abrir a porta 3333 no servidor para permitir acessos externos:
```
sudo ufw allow 3333
```

Rodar o sequelize no Servidor
```
npx sequelize db:migrate
```

# Dicas do SSH

###### Ver os processos rodando na porta 3333
	lsof -i :3333
###### Parar o processo
	kill -9 13755 (o PID)

### Deixando a sessão do SSH com um tempo maior 
Acessar o arquivo ```/etc/ssh/sshd_config``` através do ```vim```

Adicionar as seguintes linhas:
```
ClientAliveInterval 30
KeepAlive yes
ClientAliveCountMax 99999
```

Depois reiniciar o SSH: ```service sshd restart```

# Configurando NGINX
###### O que é NGINX?
NGINX, pronunciado “engine-ex,” é um famoso software de código aberto para servidores web lançado originalmente para navegação HTTP. Hoje, porém, ele também funciona como proxy reverso, balanceador de carga HTTP, e proxy de email para os protocolos IMAP, POP3, e SMTP. [Mais informações](https://www.hostinger.com.br/tutoriais/o-que-e-nginx/)

Instalar o NGINX:
```
sudo apt install nginx
```

Liberar a ṕorta 80:
```
sudo ufw allow 80
```

#### Redirecionar a porta 80 para 3333:
Acessar o arquivo default através do vim: 
```
sudo vim /etc/nginx/sites-available/default
``` 

Deixar o arquivo nas seguintes configurações: 
```
server {
        listen 80 default_server;
        listen [::]:80 default_server;

        server_name _;

        location / {
		proxy_pass http://localhost:3333;
                proxy_http_version 1.1;
                proxy_set_header Upgrade $http_upgrade;
                proxy_set_header Connection 'upgrade';
                proxy_set_header Host $host;
                proxy_cache_bypass $http_upgrade;
        }
}
```
Reiniciar o serviço: ```sudo service nginx restart```

Para saber se a configuração deu certo: ```sudo nginx -t```

# Utilizando PM2
Manter a aplicação rodando independente se o servidor é fechado ou reiniciado

Instalar PM2
``` 
sudo npm install -g pm2
```

Iniciar o PM2 (inserir o arquivo que irá executar):
 ```
 pm2 start dist/server.js
 ```

Listar os processos executados: 
```
pm2 list
```

Habilitar quando o servidor for reiniciado e não precisar executar o comando outra vez: 
```
pm2 startup systemd
sudo env PATH=$PATH:/usr/bin /usr/lib/node_modules/pm2/bin/pm2 startup systemd -u deploy --hp /home/deploy
```

Quando adicionar novos comandos na lista
```pm2 save```

Ver logs dos comandos da lista: ```pm2 monit```
