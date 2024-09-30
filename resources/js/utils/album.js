import { ref } from 'vue';

const Album = {
    cards: ref([]),
    numberOfPhotos: ref(0),
    currentBatch: ref(0),
    batchSize: 5,
    photoCounter: ref(1),

    async getImageDimensions(url) {
        return new Promise((resolve, reject) => {
            const img = new Image();
            img.onload = () => {
                resolve({ width: img.width, height: img.height });
            };
            img.onerror = reject;
            img.src = url;
        });
    },

    async getFileSize(url) {
        try {
            const response = await fetch(url, { method: 'HEAD' });
            if (response.ok) {
                const size = response.headers.get('Content-Length');
                return size ? parseInt(size, 10) : 0;
            } else {
                console.error(`Failed to fetch ${url}: ${response.statusText}`);
                return 0;
            }
        } catch (error) {
            console.error(`Error fetching ${url}:`, error);
            return 0;
        }
    },

    async loadPhotos(folder = 'photo', batchSize = this.batchSize) {
        const promises = [];
        let index = this.currentBatch.value * batchSize + 1;
        const end = index + batchSize;

        while (index < end) {
            const url = `/assets/${folder}/untitled-${index}.jpg`;
            const size = await this.getFileSize(url);
            if (size === 0) break;
            promises.push(this.getImageDimensions(url).then(dimensions => ({
                id: `photo_${this.photoCounter.value++}`,
                url,
                ...dimensions
            })));
            index++;
        }

        const newPhotos = await Promise.all(promises);
        this.cards.value = [...this.cards.value, ...newPhotos];
        this.numberOfPhotos.value = this.cards.value.length;
        this.currentBatch.value++;
    },

    async loadNextBatch() {
        await this.loadPhotos();
    },

    getProportion(card) {
        const width = card.width;
        const height = card.height;
        const ratio = width / height;

        const ratio3x2 = 3 / 2;
        const ratio2x3 = 2 / 3;

        const diff3x2 = Math.abs(ratio - ratio3x2);
        const diff2x3 = Math.abs(ratio - ratio2x3);

        if (diff3x2 < diff2x3) {
            return '3x2';
        } else {
            return '2x3';
        }
    }
};

export default Album;
