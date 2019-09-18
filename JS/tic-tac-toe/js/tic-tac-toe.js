const tic_tac_toe = {
    board: ['','','','','','','','',''],
    symbols: {
        options: ['X','O'],
        turn_index: 0,
        change: function(){ // Controle de vez dos jogadores
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

    init: function(container){
        this.container_element = container;
    },

    make_play: function(position) {
        if (this.gameover) return false;
        if (this.board[position] === '') {
            this.board[position] = this.symbols.options[
                this.symbols.turn_index
            ];
            this.draw(); // reinscrever na tela o tabuleiro
            let winning_sequences_index = this.check_winning_sequences( 
                this.symbols.options[this.symbols.turn_index]
            );
            if (winning_sequences_index >= 0) {
                this.game_is_over();
            } else {
                this.symbols.change(); // Trocar de jogador
            }
            return true;
        } else {
            return false;
        }
    },

    game_is_over: function() {
        this.gameover = true;
        console.log("GAME OVER");
    },

    start: function() {
        this.board.fill(''); // preencher todo o array com o que está no parenteses
        this.draw();
        this.gameover = false;
    },

    check_winning_sequences: function(symbol) {
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

    draw: function(){
        let content = '';

        for (i in this.board) {
            content += `<div onclick="tic_tac_toe.make_play(${i})"> ${this.board[i]} </div>`;
        }

        this.container_element.innerHTML = content;
    }
};