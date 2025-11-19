import { launchImageLibrary, ImagePickerResponse, MediaType } from 'react-native-image-picker';

export const pickImage = (): Promise<string | null> => {
  return new Promise((resolve) => {
    const options = {
      mediaType: 'photo' as MediaType,
      quality: 0.8,
      maxWidth: 500,
      maxHeight: 500,
      includeBase64: false,
    };

    launchImageLibrary(options, (response: ImagePickerResponse) => {
      if (response.didCancel) {
        resolve(null);
      } else if (response.errorMessage) {
        console.error('ImagePicker Error: ', response.errorMessage);
        resolve(null);
      } else if (response.assets && response.assets[0]) {
        resolve(response.assets[0].uri || null);
      } else {
        resolve(null);
      }
    });
  });
};

