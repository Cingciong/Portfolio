export const dragMove = (e, id, cards, layout) => {
    const card = cards.find(c => c.id === id);
    if (!card) return;

    const section = document.querySelector('section');
    const sectionRect = section.getBoundingClientRect();
    const offsetX = e.clientX - card.element.getBoundingClientRect().left;
    const offsetY = e.clientY - card.element.getBoundingClientRect().top;
    card.element.style.transitionDuration = '300ms';
    document.getElementById('ghostCard').style.opacity = '100';
    document.getElementById('ghostCard').style.transitionDuration = '0ms';
    console.log(layout.cardPositions, layout.card);
    const cardToLog = layout.cardPositions.find(c => c.id === card.id);
    if (!cardToLog) return; // Add this check

    layout.cards.forEach(position => {
        if (position.id === id) {
            position.id = 'ghostCard';
        }
    });
    layout.cardPositions = [];
    layout.cardPositions.push({
        id: 'ghostCard',
        left: cardToLog.left,
        top: cardToLog.top,
        width: cardToLog.width,
        height: cardToLog.height
    });

    console.log(layout.cardPositions);

    layout.arrangeCards();




    const onMouseMove = (e) => {
        if (!card) return;

        let newLeft = e.clientX - offsetX;
        let newTop = e.clientY - offsetY;

        // Ensure the card does not move outside the container boundaries
        const containerRight = sectionRect.left + sectionRect.width;
        const containerBottom = sectionRect.top + sectionRect.height;

        if (newLeft < sectionRect.left) {
            newLeft = sectionRect.left;
        } else if (newLeft + card.element.offsetWidth > containerRight) {
            newLeft = containerRight - card.element.offsetWidth;
        }

        if (newTop < sectionRect.top) {
            newTop = sectionRect.top;
        } else if (newTop + card.element.offsetHeight > containerBottom) {
            newTop = containerBottom - card.element.offsetHeight;
        }
        card.element.style.transitionDuration = '0ms';
        card.element.style.left = `${newLeft - sectionRect.left}px`;
        card.element.style.top = `${newTop - sectionRect.top}px`;


        layout.snapToGrid('ghostCard', newLeft- sectionRect.left, newTop-sectionRect.top);
        document.getElementById('ghostCard').style.transitionDuration = '300ms';
    };

    const onMouseUp = (e) => {
        let newLeft = e.clientX - sectionRect.left - offsetX;
        let newTop = e.clientY - sectionRect.top - offsetY;

        document.getElementById('ghostCard').style.opacity = '0';
        layout.cardPositions.forEach(position => {
            if (position.id === 'ghostCard') {
                position.id = id;
            }
        });

// Update the id in layout.cards
        layout.cards.forEach(card => {
            if (card.id === 'ghostCard') {
                card.id = id;
            }
        });

        const ghostCardElement = document.getElementById('ghostCard');
        card.element.style.left = ghostCardElement.style.left;
        card.element.style.top = ghostCardElement.style.top;

        card.element.style.transitionDuration = '300ms';

        document.removeEventListener('mousemove', onMouseMove);
        document.removeEventListener('mouseup', onMouseUp);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
};
