import { getToken } from "./authenticate";

export const addToFavourites = async (id) => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/favourites/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `JWT ${getToken()}`
        }
    });
    if (res.status === 200) {
        return await res.json();
    } else {
        return [];
    }
};

export const removeFromFavourites = async (id) => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/favourites/${id}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `JWT ${getToken()}`
        }
    });
    if (res.status === 200) {
        return await res.json();
    } else {
        return [];
    }
};

export const getFavourites = async () => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/favourites`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `JWT ${getToken()}`
        }
    });
    if (res.status === 200) {
        return await res.json();
    } else {
        return [];
    }
};