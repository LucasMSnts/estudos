class App {
    constructor() {
        this.repositories = [];

        this.formEl = document.getElementById('repo-form');
        this.listEl = document.getElementById('repo-list');

        this.registerHandlers();
    }

    registerHandlers() {
        this.formEl.onsubmit = event => this.addRepository(event);        
    }

    addRepository(event) {
        event.preventDefault();

        this.repositories.push({
            name: 'github.com.br',
            description: 'Repositorios do usuario',
            avatar_url: 'https://avatars0.githubusercontent.com/u/44436395?v=4',
            html_url: 'https://github.com/LucasMSnts',
        });
        console.log(this.repositories);       
    }
    
}

new App();