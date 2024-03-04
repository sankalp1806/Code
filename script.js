class Paper {
  constructor() {
    this.holdingPaper = false;
    this.startX = 0;
    this.startY = 0;
    this.currentX = 0;
    this.currentY = 0;
    this.offsetX = 0;
    this.offsetY = 0;
    this.rotation = 0;
    this.rotating = false;
  }

  init(paper) {
    const startDragging = (e) => {
      if (!this.holdingPaper) {
        this.holdingPaper = true;
        this.startX = e.clientX || e.touches[0].clientX;
        this.startY = e.clientY || e.touches[0].clientY;
        this.offsetX = this.startX - this.currentX;
        this.offsetY = this.startY - this.currentY;
        paper.style.zIndex = highestZ++;
      }
    };

    const movePaper = (e) => {
      if (this.holdingPaper) {
        e.preventDefault();
        this.currentX = (e.clientX || e.touches[0].clientX) - this.offsetX;
        this.currentY = (e.clientY || e.touches[0].clientY) - this.offsetY;
        paper.style.transform = `translate(${this.currentX}px, ${this.currentY}px) rotate(${this.rotation}deg)`;
      }
    };

    const stopDragging = () => {
      if (this.holdingPaper) {
        this.holdingPaper = false;
      }
    };

    paper.addEventListener('mousedown', startDragging);
    paper.addEventListener('touchstart', startDragging);

    document.addEventListener('mousemove', movePaper);
    document.addEventListener('touchmove', movePaper);

    document.addEventListener('mouseup', stopDragging);
    document.addEventListener('touchend', stopDragging);

    // For two-finger rotation on touch screens
    paper.addEventListener('gesturestart', (e) => {
      e.preventDefault();
      this.rotating = true;
    });
    paper.addEventListener('gestureend', () => {
      this.rotating = false;
    });
  }
}

const papers = Array.from(document.querySelectorAll('.paper'));

papers.forEach(paper => {
  const p = new Paper();
  p.init(paper);
});

var highestZ = 1;
