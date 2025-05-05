class LightsOutGame {
    constructor(size = 5) {
      this.size = size;
      this.board = [];
      this.moves = 0;
      this.seconds = 0;
      this.timer = null;
      this.boardEl = document.getElementById('board');
      this.moveCounterEl = document.getElementById('moveCount');
      this.timeEl = document.getElementById('timeElapsed');
      this.init();
    }
  
    init() {
      this.board = Array.from({ length: this.size }, () =>
        Array.from({ length: this.size }, () => false)
      );
  
      this.boardEl.innerHTML = '';
      this.moves = 0;
      this.seconds = 0;
      clearInterval(this.timer);
      this.timer = setInterval(() => this.updateTimer(), 1000);
      this.moveCounterEl.textContent = this.moves;
  
      for (let r = 0; r < this.size; r++) {
        for (let c = 0; c < this.size; c++) {
          const cell = document.createElement('div');
          cell.className = 'cell';
          cell.dataset.row = r;
          cell.dataset.col = c;
          cell.addEventListener('click', () => this.toggleCell(r, c, true));
          this.boardEl.appendChild(cell);
        }
      }
  
      for (let i = 0; i < 10; i++) {
        const randR = Math.floor(Math.random() * this.size);
        const randC = Math.floor(Math.random() * this.size);
        this.toggleCell(randR, randC, false);
      }
  
      this.updateBoardDisplay();
    }
  
    toggleCell(row, col, countMove = true) {
      const directions = [[0,0], [-1,0], [1,0], [0,-1], [0,1]];
      for (let [dr, dc] of directions) {
        const r = row + dr;
        const c = col + dc;
        if (r >= 0 && r < this.size && c >= 0 && c < this.size) {
          this.board[r][c] = !this.board[r][c];
        }
      }
  
      if (countMove) {
        this.moves++;
        this.moveCounterEl.textContent = this.moves;
      }
  
      this.updateBoardDisplay();
  
      if (this.checkWin() && countMove) {
        clearInterval(this.timer);
        setTimeout(() => alert("You win!"), 100);
      }
    }
  
    updateBoardDisplay() {
      for (let r = 0; r < this.size; r++) {
        for (let c = 0; c < this.size; c++) {
          const cell = this.boardEl.querySelector(`[data-row="${r}"][data-col="${c}"]`);
          if (this.board[r][c]) {
            cell.classList.remove('off'); // black = on
          } else {
            cell.classList.add('off'); // white = off
          }
        }
      }
    }
  
    checkWin() {
      return this.board.flat().every(val => !val);
    }
  
    updateTimer() {
      this.seconds++;
      const min = Math.floor(this.seconds / 60);
      const sec = this.seconds % 60;
      this.timeEl.textContent = `${min}:${sec.toString().padStart(2, '0')}`;
    }
  }
  
  document.addEventListener('DOMContentLoaded', () => {
    const game = new LightsOutGame();
    document.getElementById('restart').addEventListener('click', () => game.init());
  });
  