class Layout {
    constructor() {
        this.containerSize = 0;
        this.cardSizes = [];
        this.gridColumns = 12;
        this.cardPositions = [];
        this.gap = 3.5;
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
            card.style.width = `${(gridWidth * columnWidth) - this.gap * 2 - 1}px`;
            card.style.height = `${(gridHeight * columnWidth) - this.gap * 2 - 1}px`;
            return cardSize;
        });
    }

    arrangeCards() {
        const columnWidth = this.containerSize / this.gridColumns;


        this.cardSizes.forEach(cardSize => {
            let currentX = 0;
            let currentY = 0;
            let placed = false;

            while (!placed) {
                const cardWidth = Math.floor(cardSize.gridWidth * columnWidth);
                const cardHeight = Math.floor(cardSize.gridHeight * columnWidth);

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
                        width: cardWidth,
                        height: cardHeight,
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
        console.log(this.cardPositions);
        this.applyCardPositions()
        console.log('aaa');
        console.log(this.cardPositions);
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

    findClosestGridPoint(left, top) {
        const columnWidth = this.containerSize / this.gridColumns;

        let y =0;
        let corners = [];
            while(true){
                if (y>=2){
                    let firstLayer = corners[y-2];
                    let secondLayer = corners[y-1];

                    let firstLayerSmallest =firstLayer.reduce((acc, val) => {
                        return acc.distance < val.distance ? acc : val;
                    });

                    let secondLayerSmallest = secondLayer.reduce((acc, val) => {
                        return acc.distance < val.distance ? acc : val;
                    });

                    if (firstLayerSmallest.distance <= secondLayerSmallest.distance) {
                        return firstLayerSmallest;
                    }
                }
                for (let x = 0; x <= this.gridColumns; x++) {
                    const xCorner = x * columnWidth;
                    const yCorner = y * columnWidth;
                    const distance = Math.sqrt(
                        Math.pow(left - xCorner, 2) + Math.pow(top - yCorner, 2)
                    );
                    if (!corners[y]) {
                        corners[y] = [];
                    }
                    corners[y].push({ distance, x, y });
                }
                y++;
            }

    }

    snapToGrid(left, top, element) {
        const elementWidth = element.offsetWidth;
        const elementHeight = element.offsetHeight;
        const columnWidth = this.containerSize / this.gridColumns;
        const centerX = left + elementWidth / 2;
        const centerY = top + elementHeight / 2;
        const closestPoint = this.findClosestGridPoint(left, top);
        const elementGridSize = element.getAttribute('size').split('x').map(Number);
        const elementGridWidth = elementGridSize[0];
        const elementGridHeight = elementGridSize[1];

        let newLeft = Math.floor(closestPoint.x * columnWidth);
        let newTop = Math.floor(closestPoint.y * columnWidth);


        if (closestPoint.x + elementGridWidth > this.gridColumns) {
            newLeft = Math.floor((this.gridColumns - elementGridWidth) * columnWidth);
        }

        if (closestPoint.y + elementGridHeight > this.gridColumns) {
            newTop = Math.floor((this.gridColumns - elementGridHeight) * columnWidth);
        }

        console.log('card postion: ',this.cardPositions);
        const cardPosition = this.cardPositions.find(pos => pos.element === element);
        if (cardPosition) {
            cardPosition.left = newLeft;
            cardPosition.top = newTop;
        }

        this.applyCardPositions();


    }

    }


export const createLayout = () => new Layout();
