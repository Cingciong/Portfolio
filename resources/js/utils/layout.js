class Layout {
    constructor() {
        this.containerSize = 0;
        this.gap = 3.5;
        this.gridColumns = 12;
        this.cards = [];
        this.cardPositions = [];
        this.calculatedPositions = [];

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
        let currentLeft = 0;
        let currentTop = 0;

        this.cards.forEach(card => {
            const elementGridWidth = card.gridWidth;
            const elementGridHeight = card.gridHeight;

            if (currentLeft + elementGridWidth > this.gridColumns) {
                currentLeft = 0;
                currentTop += elementGridHeight;
            }

            this.cardPositions.push({
                id: card.id,
                left: currentLeft,
                top: currentTop,
                width: elementGridWidth,
                height: elementGridHeight,
            });

            currentLeft += elementGridWidth;
        });

        this.calculatePosition();

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
        console.log('aaa: ' + this.calculatedPositions);
        this.calculatedPositions.forEach(position => {
            console.log(position.id);
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
        const gridLeft = Math.round(left / columnWidth) * columnWidth;
        const gridTop = Math.round(top / columnWidth) * columnWidth;
        const element = document.getElementById(id);

        if (element) {
            const elementWidth = element.offsetWidth;
            const maxLeft = this.containerSize - elementWidth;

            const boundedLeft = Math.min(Math.max(gridLeft, 0), maxLeft);
            const boundedTop = Math.max(gridTop, 0); // Assuming no vertical overflow

            element.style.left = `${boundedLeft}px`;
            element.style.top = `${boundedTop}px`;
        }
    }

}



export const createLayout = () => new Layout();
