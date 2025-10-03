export const translate = async (
  content: string,
  translateFrom: string,
  translateTo: string
): Promise<string> => {
  return new Promise((resolve, reject) => {
    try {
      fetch(
        `https://api.mymemory.translated.net/get?q=${content}&langpair=${translateFrom}|${translateTo}`
      )
        .then((response) => response.json())
        .then((data) => resolve(data.responseData.translatedText));
    } catch (error) {
      reject(error);
    }
  });
};
