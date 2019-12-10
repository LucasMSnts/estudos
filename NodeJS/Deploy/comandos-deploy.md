--------------------- Configurando servidor ---------------------

Acessar o servidor
ssh root@0.0.0.0 (pegar o IP no cloud)

Quando criar e iniciar o servidor pela primeira vez, atualiza-lo:
apt update
apt upgrade

Adicionar usuario:
adduser deploy

Dar direitos ao usuario:
usermod -aG sudo deploy

Logar direto no usuario deploy:
cd /home/deploy/
mkdir .ssh
cd .ssh/
cp ~/.ssh/authorized_keys .  // Copia o arquivo da pasta(~/.ssh/authorized_keys) para a pasta local
chown deploy:deploy authorized_keys // troca o usuario que executa o arquivo

Sair do servidor:
exit

Instalar NodeJS: (Ver site)
curl -sL https://deb.nodesource.com/setup_10.x | sudo -E bash - 
sudo apt-get install -y nodejs

--------------------- Configurando aplicação ---------------------

Clonar o projeto na raiz:
git clone https://github.com/LucasMSnts/projeto.git

Entrar no projeto e instalar as dependencias:
cd projeto
npm install

Configurar o .env
cp .env.example .env
vim .env

Alterar o node_env para produção
NODE_ENV=production

--------------------- Criando serviços ---------------------
Habilitar o docker para o usuario "deploy":
sudo groupadd docker
sudo usermod -aG docker $USER

Baixar e configurar o container do Postgres:
docker run --name postgres -e POSTGRES_PASSWORD=bootcampdeploy -p 5432:5432 -d -t postgres

Baixar e configurar o container do MongoDB:
docker run --name mongo -p 27017:27017 -d -t mongo

Baixar e configurar o container do Redis: (versão mais limpa)
docker run --name redis -p 6379:6379 -d -t redis:alpine


	Entrar no Postgres pelo docker:
	docker exec -i -t postgres /bin/sh

	Acessar o usuario postgres (usuario padrão do Postgres)
	su postgres

	Acessar as "tabelas" do Postgres
	psql
	
		Criar banco de dados:
		CREATE DATABASE bootcampnodejs;
		
		Sair das "tabelas"
		\q
	
	Sair do usuario postgres e do Postgres
	exit
	exit

--------------------- Rodando servidor ---------------------

