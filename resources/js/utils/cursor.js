export const dragMove = (e, id, cards, layout) => {
    const card = cards.find(c => c.id === id);
    if (!card) return;

    const section = document.querySelector('section');
    const sectionRect = section.getBoundingClientRect();
    const offsetX = e.clientX - card.element.getBoundingClientRect().left;
    const offsetY = e.clientY - card.element.getBoundingClientRect().top;

    layout.cardPositions.forEach(position => {
        if (position.id === id) {
            position.id = 'ghostCard';
        }
    });
    layout.calculatePosition();




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
    };

    const onMouseUp = (e) => {
        let newLeft = e.clientX - sectionRect.left - offsetX;
        let newTop = e.clientY - sectionRect.top - offsetY;
        layout.snapToGrid(id, newLeft, newTop);
        card.element.style.transitionDuration = '300ms';

        document.removeEventListener('mousemove', onMouseMove);
        document.removeEventListener('mouseup', onMouseUp);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
};
