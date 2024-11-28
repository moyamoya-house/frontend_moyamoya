export const fetchAudioId = async (id: number) => {
    try {
        const response = await fetch(`http://127.0.0.1:5000/pots/${id}`);
        if (!response.ok) {
            throw new Error("Failed to fetch audio data");
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error fetching audio data", error);
        return null;
    }
}