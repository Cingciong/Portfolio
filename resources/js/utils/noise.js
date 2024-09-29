// utils/noise.js
export function generateNoiseCanvas(width, height, pointSize, color1, color2) {
    const canvas = document.createElement('canvas');
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext('2d');
    const imageData = ctx.createImageData(width, height);
    const data = imageData.data;

    function interpolateColor(color1, color2, factor) {
        const result = color1.slice();
        for (let i = 0; i < 3; i++) {
            result[i] = Math.round(result[i] + factor * (color2[i] - color1[i]));
        }
        return result;
    }

    for (let y = 0; y < height; y += pointSize) {
        for (let x = 0; x < width; x += pointSize) {
            const factor = Math.random();
            const color = interpolateColor(color1, color2, factor);
            for (let dy = 0; dy < pointSize; dy++) {
                for (let dx = 0; dx < pointSize; dx++) {
                    const index = ((y + dy) * width + (x + dx)) * 4;
                    data[index] = color[0];     // Red
                    data[index + 1] = color[1]; // Green
                    data[index + 2] = color[2]; // Blue
                    data[index + 3] = 255;      // Alpha
                }
            }
        }
    }

    ctx.putImageData(imageData, 0, 0);
    return canvas;
}

export function setNoiseBackground(elementId, width, height, pointSize, color1, color2) {
    const canvas = generateNoiseCanvas(width, height, pointSize, color1, color2);
    const dataUrl = canvas.toDataURL();
    const element = document.getElementById(elementId);
    if (element) {
        element.style.backgroundImage = `url(${dataUrl})`;
    } else {
        console.error(`Element with ID ${elementId} not found`);
    }
}
