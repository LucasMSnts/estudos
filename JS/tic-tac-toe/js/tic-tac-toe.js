const tic_tac_toe = {
    board: ['','','','','','','','',''],
    symbols: {
        options: ['X','O'],
        turn_index: 0,
        change (){ // Controle de vez dos jogadores
            this.turn_index = (this.turn_index === 0 ? 1 : 0);
        }
    },
    container_element: null,
    gameover: false,
    winning_sequences: [
        [0,1,2],
        [3,4,5],
        [6,7,8],
        [0,3,6],
        [1,4,7],
        [2,5,8],
        [0,4,8],
        [2,4,6]
    ],

    init (container){
        this.container_element = container;
    },

    make_play (position) { 
        if (this.gameover || this.board[position] !== '') return false;

        const currentSymbol = this.symbols.options[this.symbols.turn_index];
        this.board[position] = currentSymbol;
        this.draw(); // reescrever na tela o tabuleiro

        const winning_sequences_index = this.check_winning_sequences(currentSymbol);
        if (this.is_game_over()){
            this.game_is_over();
        }
        if (winning_sequences_index >= 0) {
            this.game_is_over();
            this.stylize_winner_sequence(
                this.winning_sequences[winning_sequences_index]
            );
        } else {
            this.symbols.change(); // Trocar de jogador
        }

        return true;
    },

    stylize_winner_sequence(winner_sequence) { // Marca a sequencia vencedora
        winner_sequence.forEach((position) => {
          this
            .container_element
            .querySelector(`div:nth-child(${position + 1})`)
            .classList.add('winner');
        });
    },

    game_is_over () {
        this.gameover = true;
        console.log("GAME OVER");
    },

    is_game_over () {        
        return !this.board.includes(''); // verifica se tem '' no array
    },

    start () {
        this.board.fill(''); // preencher todo o array com o que está no parenteses
        this.draw();
        this.gameover = false;
    },

    restart () {
        if (this.is_game_over() || this.gameover) {
            this.start();
            console.log('This game has been restarted!')
        } else if (confirm('Are you sure you want to restart this game?')) {
            this.start();
            console.log('This game has been restarted!')
        }
    },

    check_winning_sequences (symbol) {
        for(i in this.winning_sequences) {
            if (this.board[this.winning_sequences[i][0]] == symbol &&
                this.board[this.winning_sequences[i][1]] == symbol &&
                this.board[this.winning_sequences[i][2]] == symbol) {
                    console.log(`Sequencia vencedora: ${i}`);
                    return i;                    
            }
        };
        return -1;
    },

    draw (){
        /*let content = '';
        for (i in this.board) {
            content += `<div onclick="tic_tac_toe.make_play(${i})"> ${this.board[i]} </div>`;
        }
        this.container_element.innerHTML = content;*/

        this.container_element.innerHTML = this.board.map((element, index) => 
            `<div onclick="tic_tac_toe.make_play('${index}')"> ${element} </div>`).reduce((content, current) => content + current);
    }
};