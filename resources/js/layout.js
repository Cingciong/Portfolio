class Layout {
    constructor() {
        this.containerSize = 0;
        this.cardSizes = [];
        this.gridColumns = 9;
        this.cardPositions = [];
    }

    getContainerSize() {
        const container = document.querySelector('.container');
        if (container) {
            this.containerSize = container.offsetWidth;
        } else {
            this.containerSize = 0;
        }
    }

    getCardSizes() {
        const cardElements = document.querySelectorAll('.card');
        const columnWidth = this.containerSize / this.gridColumns;

        this.cardSizes = Array.from(cardElements).map(card => {
            const size = card.getAttribute('size');
            const [gridWidth, gridHeight] = size.split('x').map(Number);
            const cardSize = {
                gridWidth: gridWidth,
                gridHeight: gridHeight,
                element: card, // Ensure the element is assigned
                key: card.getAttribute('key') // Get the key attribute
            };
            card.style.width = `${gridWidth * columnWidth}px`;
            card.style.height = `${gridHeight * columnWidth}px`;
            return cardSize;
        });
    }
    arrangeCards() {
        const columnWidth = this.containerSize / this.gridColumns;
        this.cardPositions = [];

        this.cardSizes.forEach(cardSize => {
            let currentX = 0;
            let currentY = 0;
            let placed = false;

            while (!placed) {
                const cardWidth = cardSize.gridWidth * columnWidth;
                const cardHeight = cardSize.gridHeight * columnWidth;

                const overlapping = this.cardPositions.some(pos =>
                    currentX < pos.left + pos.width &&
                    currentX + cardWidth > pos.left &&
                    currentY < pos.top + pos.height &&
                    currentY + cardHeight > pos.top
                );

                if (!overlapping) {
                    this.cardPositions.push({
                        key: cardSize.key, // Use the key attribute
                        left: Math.floor(currentX),
                        top: Math.floor(currentY),
                        width: Math.floor(cardWidth),
                        height: Math.floor(cardHeight),
                        element: cardSize.element // Ensure the element is included
                    });
                    placed = true;
                } else {
                    currentX += columnWidth;
                    if (currentX + cardWidth > this.containerSize) {
                        currentX = 0;
                        currentY += columnWidth;
                    }
                }
            }
        });
    }

    applyCardPositions() {
        this.cardPositions.forEach(pos => {
            console.log(pos);
            if (pos.element) {
                pos.element.style.left = `${pos.left}px`;
                pos.element.style.top = `${pos.top}px`;
            }
        });
    }
}

export const createLayout = () => new Layout();
