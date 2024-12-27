export const playAudio = async (audioBlob: Blob): Promise<void> => {
  try {
    const url = URL.createObjectURL(audioBlob);
    const audio = new Audio(url);

    await audio.play();

    // Clean up the URL after the audio finishes playing
    audio.onended = () => {
      URL.revokeObjectURL(url);
    };
  } catch (error) {
    console.error('Error playing audio:', error);
    throw error;
  }
};
