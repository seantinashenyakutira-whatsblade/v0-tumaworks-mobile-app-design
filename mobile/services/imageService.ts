import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { storage } from './firebase';

export class ImageService {
    /**
     * Uploads an image to Firebase Storage with path-based organization.
     * Phase 10: Profile pictures, listing images.
     */
    static async uploadImage(uri: string, path: string): Promise<string> {
        try {
            // In RN/Expo, we first fetch the blob from local URI
            const response = await fetch(uri);
            const blob = await response.blob();

            const storageRef = ref(storage, path);
            await uploadBytes(storageRef, blob);

            const downloadURL = await getDownloadURL(storageRef);
            return downloadURL;
        } catch (err: any) {
            console.error("Image Upload Failed", err);
            throw new Error("Failed to upload image");
        }
    }

    static generateProfilePath(uid: string) {
        return `users/${uid}/profile.jpg`;
    }

    static generateListingPath(uid: string, listingId: string) {
        return `listings/${uid}/${listingId}.jpg`;
    }
}
