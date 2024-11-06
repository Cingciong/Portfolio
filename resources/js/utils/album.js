import { ref } from 'vue';

const images200w = import.meta.glob('../../../public/assets/photos/200w/*.JPG');
const images250w = import.meta.glob('../../../public/assets/photos/250w/*.JPG');
const images325w = import.meta.glob('../../../public/assets/photos/325w/*.JPG');
const images370w = import.meta.glob('../../../public/assets/photos/370w/*.JPG');

const images = { ...images200w, ...images250w, ...images325w, ...images370w };

const Album = {
    photos: ref([]),
    numberOfPhotos: ref(0),
    currentBatch: ref(0),
    batchSize: 9, // Default batch size
    photoCounter: ref(1), // Initialize a global counter for unique IDs
    fileCount: ref(Object.keys(images200w).length),

    async loadPhotos(batchSize = Album.batchSize) {
        let index = Album.currentBatch.value * batchSize + 1;
        const end = index + batchSize;
        const newPhotos = [];
        if (index > Album.fileCount.value) return newPhotos;

        while (index < end) {
            const photo = {
                id: Album.photoCounter.value++,
                url: `untitled-${index}.jpg`,
                alt: `Untitled-${index}`,
                photo_sm: (await images[`../../../public/assets/photos/200w/untitled-${index}.JPG`]()).default,
                photo_md: (await images[`../../../public/assets/photos/250w/untitled-${index}.JPG`]()).default,
                photo_lg: (await images[`../../../public/assets/photos/325w/untitled-${index}.JPG`]()).default,
                photo_xl: (await images[`../../../public/assets/photos/370w/untitled-${index}.JPG`]()).default,
            };
            newPhotos.push(photo);
            index++;
        }

        Album.photos.value = [...Album.photos.value, ...newPhotos];
        Album.numberOfPhotos.value = Album.photos.value.length;
        Album.currentBatch.value++;
        return newPhotos;
    },

    async countFilesInDirectory() {
        try {
            const response = await axios.get('/api/count-files');
            Album.fileCount.value = response.data.fileCount;
        } catch (error) {
            console.error(`Error fetching file count: ${error.message}`);
            Album.fileCount.value = 0;
        }
    }
};

export default Album;
