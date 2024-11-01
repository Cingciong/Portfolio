import { ref } from 'vue';
import axios from 'axios';

const Album = {
    photos: ref([]),
    numberOfPhotos: ref(0),
    currentBatch: ref(0),
    batchSize: 9, // Default batch size
    photoCounter: ref(1), // Initialize a global counter for unique IDs
    fileCount: ref(0),

    countFilesInDirectory: async () => {
        console.log('Fetching file count...');
        try {
            const response = await axios.get('/api/count-files');
            Album.fileCount.value = response.data.fileCount;
        } catch (error) {
            console.error(`Error fetching file count: ${error.message}`);
            Album.fileCount.value = 0;
        }
    },

    async loadPhotos(batchSize = Album.batchSize) {
        let index = Album.currentBatch.value * batchSize + 1;
        const end = index + batchSize;
        const newPhotos = [];
        if(index > Album.fileCount.value) {
            return [];
        }
        while (index < end) {
            const photo = {
                id: Album.photoCounter.value++,
                url: `untitled-${index}.jpg`,
                alt: `Untitled-${index}`,
                photo_sm: `assets/photos/200w/untitled-${index}.jpg`,
                photo_md: `assets/photos/250w/untitled-${index}.jpg`,
                photo_lg: `assets/photos/325w/untitled-${index}.jpg`,
                photo_xl: `assets/photos/370w/untitled-${index}.jpg`,
            };
            newPhotos.push(photo);
            index++;
        }

        Album.photos.value = [...Album.photos.value, ...newPhotos];
        Album.numberOfPhotos.value = Album.photos.value.length;
        Album.currentBatch.value++;
        console.log(Album.photos.value);

        return newPhotos;
    }
};

export default Album;
