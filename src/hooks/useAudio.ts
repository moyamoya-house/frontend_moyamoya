export const fetchAudio = async () => {
    const response = await fetch("http://127.0.0.1:5000/pots",{
        method: "GET",
    });
    if (!response.ok) {
        throw new Error("Failed to fetch pots");
    }
    return response.json();
}

export const fetchUsers = async (userIds: number[]) => {
    const userDataPromises = userIds.map((id) => 
    fetch(`http://127.0.0.1:5000/users/${id}`).then((response) => {
        if(!response.ok) {
            throw new Error(`Failed to fetch user with id: ${id}`);
        }
        return response.json();
    })
    );
    return Promise.all(userDataPromises);
}