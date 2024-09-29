import { ref } from 'vue';

const Album = {
    cards: ref([]),
    numberOfPhotos: ref(0),
    currentBatch: ref(0),
    batchSize: 5, // Default batch size
    photoCounter: ref(1), // Initialize a global counter for unique IDs

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

    async loadPhotos(batchSize = this.batchSize) {
        const promises = [];
        let index = this.currentBatch.value * batchSize + 1;
        const end = index + batchSize;

        while (index < end) {
            const url = `/assets/photos/untitled-${index}.jpg`;
            const size = await this.getFileSize(url);
            if (size === 0) break; // Exit the loop if no more photos are found
            promises.push(this.getImageDimensions(url).then(dimensions => ({
                id: `photo_${this.photoCounter.value++}`, // Ensure unique ID using global counter
                url,
                ...dimensions
            })));
            index++;
        }

        const newPhotos = await Promise.all(promises);
        this.cards.value = [...this.cards.value, ...newPhotos];
        this.numberOfPhotos.value = this.cards.value.length; // Update the number of photos loaded
        this.currentBatch.value++; // Increment the batch counter
        console.log(this.cards.value);
    },

    async loadNextBatch() {
        await this.loadPhotos();
        console.log(this.cards.value);
    }
};

export default Album;
