export const fetchUsers = async () => {
    const response = await fetch("http://127.0.0.1:5000/users",{
        method: "GET",
    });
    if (!response.ok) {
        throw new Error('Failed to fetch users');
    }
    return response.json();
}