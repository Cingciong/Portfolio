import {initializeCardElements} from "@/utils/cursor.js";

class Layout {
    constructor() {
        this.gridColumns = 12; // Default value
        this.keyCounter = 0;
        this.cardPositions = [];
        this.calculatedPositions = [];
        this.containerSize = 0;
        this.gap = 5; // Example gap value, adjust as needed
        this.cards = []; // Initialize this.cards

        // Define breakpoints



    }


    getContainerSize() {
        const container = document.querySelector('.container');
        if (container) {
            this.containerSize = container.offsetWidth;
        } else {
            this.containerSize = 0;
        }
    }

    getCards() {
        const cards = document.querySelectorAll('.card');
        this.cards = Array.from(cards).map(card => {
            const size = card.getAttribute('size').split('x').map(Number);
            return {
                id: card.getAttribute('id'),
                gridWidth: size[0],
                gridHeight: size[1],
            };
        });
    }

    arrangeCards() {
        if (!this.cards) return; // Ensure this.cards is defined

        // Initialize the grid with the correct number of columns for each row
        const grid = Array.from({ length: this.gridColumns }, () => Array(this.gridColumns).fill(false));
        let currentTop = 0;

        const ghostCard = this.cardPositions.find(card => card.id === 'ghostCard');
        if (ghostCard) {
            this.placeCard(grid, ghostCard.left, ghostCard.top, ghostCard.width, ghostCard.height);
        }

        this.cards.forEach(card => {
            if (card.id === 'ghostCard') return; // Skip ghostCard as it's already placed
            const elementGridWidth = card.gridWidth;
            const elementGridHeight = card.gridHeight;

            let placed = false;

            for (let row = 0; !placed; row++) {
                for (let col = 0; col <= this.gridColumns - elementGridWidth; col++) {
                    if (this.canPlaceCard(grid, col, row, elementGridWidth, elementGridHeight)) {
                        this.placeCard(grid, col, row, elementGridWidth, elementGridHeight);
                        if (!this.cardPositions.some(existingCard => existingCard.id === card.id)) {
                            this.cardPositions.push({
                                id: card.id,
                                left: col,
                                top: row,
                                width: elementGridWidth,
                                height: elementGridHeight,
                            });
                        }
                        placed = true;
                        break;
                    }
                }
            }
        });

        this.calculatePosition();
        this.adjustContainerSize();
    }

    canPlaceCard(grid, col, row, width, height) {
        for (let i = 0; i < width; i++) {
            for (let j = 0; j < height; j++) {
                if (grid[col + i][row + j]) {
                    return false;
                }
            }
        }
        return true;
    }

    placeCard(grid, col, row, width, height) {
        for (let i = 0; i < width; i++) {
            for (let j = 0; j < height; j++) {
                grid[col + i][row + j] = true;
            }
        }
    }

    calculatePosition() {
        const columnWidth = this.containerSize / this.gridColumns;
        this.calculatedPositions = [];
        this.cardPositions.forEach(card => {
            const gridLeft = card.left;
            const gridTop = card.top;

            const calculatedPosition = {
                id: card.id,
                left: gridLeft * columnWidth,
                top: gridTop * columnWidth,
                width: card.width * columnWidth - this.gap * 2,
                height: card.height * columnWidth - this.gap * 2
            };

            this.calculatedPositions.push(calculatedPosition);
        });

        this.applyChanges();
    }

    applyChanges() {
        this.calculatedPositions.forEach(position => {
            const element = document.getElementById(position.id);
            if (element) {
                element.style.left = `${position.left}px`;
                element.style.top = `${position.top}px`;
                element.style.width = `${position.width}px`;
                element.style.height = `${position.height}px`;
            }
        });
    }

    snapToGrid(id, left, top) {
        const columnWidth = this.containerSize / this.gridColumns;
        console.log('Column Width:', columnWidth);
        console.log('Top:', top);

        const gridLeft = Math.max(0, Math.min(Math.round(left / columnWidth), this.gridColumns - 1));
        const gridTop = Math.round(top / columnWidth);
        console.log('Grid Top:', gridTop);

        const element = document.getElementById(id);

        if (element) {
            const elementWidth = Math.round(element.offsetWidth / columnWidth);
            const elementHeight = Math.round(element.offsetHeight / columnWidth);

            this.cardPositions = [];

            const snappedPosition = {
                id: id,
                left: gridLeft,
                top: gridTop,
                width: elementWidth,
                height: elementHeight
            };

            this.cardPositions.push(snappedPosition);
            this.arrangeCards();
            this.adjustContainerSize(); // Ensure container size is updated
        }
    }

    adjustContainerSize() {
        const container = document.querySelector('.container');
        if (!container) return;

        // Calculate the maximum bottom position of all cards
        let maxBottom = 0;
        this.cardPositions.forEach(card => {
            const cardBottom = card.top + card.height;
            if (cardBottom > maxBottom) {
                maxBottom = cardBottom;
            }
        });

        // Calculate the required height in pixels
        const columnWidth = this.containerSize / this.gridColumns;
        const requiredHeight = maxBottom * columnWidth;

        // Adjust the container height
        container.style.height = `${requiredHeight}px`;
    }

    getNextKey() {
        return 'card_' + this.keyCounter++;
    }
}

export const createLayout = () => new Layout();
