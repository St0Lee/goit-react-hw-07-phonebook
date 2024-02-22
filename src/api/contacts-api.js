import axios from "axios";

const contactsInstance = axios.create({
    baseURL: "https://65d62e26f6967ba8e3bda811.mockapi.io/api/contacts"
});

export const getContacts = async () => {
    const {data} = await contactsInstance.get("/");
    return data;
};

export const postContact = async (body) => {
    const {data} = await contactsInstance.post("/", body);
    return data;
};

export const removeContact = async (id) => {
    const {data} = await contactsInstance.delete(`/${id}`);
    return data;
}

