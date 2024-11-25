// src/utils/api.ts
export const fetchPosts = async () => {
    const response = await fetch("http://127.0.0.1:5000/moyamoya", {
      method: "GET",
    });
    if (!response.ok) {
      throw new Error("Failed to fetch posts");
    }
    return response.json();
  };
  
  export const fetchFollowPosts = async (token: string) => {
    const response = await fetch("http://127.0.0.1:5000/moyamoya_follow", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (!response.ok) {
      throw new Error("Failed to fetch follow posts");
    }
    return response.json();
  };
  
  export const fetchUsers = async (userIds: number[]) => {
    const userDataPromises = userIds.map((id) =>
      fetch(`http://127.0.0.1:5000/users/${id}`).then((response) => {
        if (!response.ok) {
          throw new Error(`Failed to fetch user with id: ${id}`);
        }
        return response.json();
      })
    );
    return Promise.all(userDataPromises);
  };
  