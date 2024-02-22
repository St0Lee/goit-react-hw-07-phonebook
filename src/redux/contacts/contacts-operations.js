import { createAsyncThunk } from "@reduxjs/toolkit";

import * as contactsApi from "api/contacts-api";

// import { fetchContactsLoading, fetchContactsSuccess, fetchContactsError,  postContactsLoading, postContactsSuccess,  postContactsError, removeContactsLoading, removeContactsSuccess, removeContactsError } from "./contacts-slice";

export const fetchContacts = createAsyncThunk(
    "contacts/fetchAll",
    async(_, thunkAPI) => {
        try{
            const data = await contactsApi.getContacts();
            return data;
        }
        catch(error){
            return thunkAPI.rejectWithValue(error.message);
        }
    }
   );

export const postContact = createAsyncThunk(
    "contacts/addContact",
    async(body, {rejectWithValue}) => {
        try{
            const data = await contactsApi.postContact(body);
            return data;
        }
        catch(error){
            return rejectWithValue(error.message);
        }
    },
    {
        condition: ({name, number}, {getState}) => {
        const {contacts} = getState();
        const normalizedName = name.toLowerCase();
        const normalizedNumber = number.toLowerCase();

        const dublicate = contacts.items.find(item => {
            const normalizedCurrentName = item.name.toLowerCase();
            const normalizedCurrentNumber = item.number.toLowerCase();
            return (normalizedCurrentName === normalizedName || normalizedCurrentNumber === normalizedNumber);
        })

        if(dublicate) {
           alert(`You've already added ${name} or a number ${number} to your phonebook.`);        
            return false;
        }
        }
    }
);

export const removeContact = createAsyncThunk(
    "contact/deleteContact",
    async(id, {rejectWithValue}) => {
        try{
            await contactsApi.removeContact(id);
            return id;
        }
        catch(error){
            return rejectWithValue(error.message);
        }
    }
);


// export const fetchContacts = () => {
//     const func = async(dispatch) => {
//         try{
//             dispatch(fetchContactsLoading())
//             const data = await contactsApi.getContacts();
//             dispatch(fetchContactsSuccess(data));
//         }
//         catch(error){
//             dispatch(fetchContactsError(error.message));
//         }
//     };

//     return func;
// };

// export const postContact = (body) => {
//     const func = async (dispatch) => {
//         try{
//             dispatch(postContactsLoading());
//             const data = await contactsApi.postContact(body);
//             dispatch(postContactsSuccess(data));
//         }
//         catch(error){
//             dispatch(postContactsError(error.message))
//         }
//     };

//     return func;
// };

// export const removeContact = (id) => {
//     const func = async (dispatch) => {
//         try{
//             dispatch(removeContactsLoading())
//             await contactsApi.removeContact(id);
//             dispatch(removeContactsSuccess(id));
//         }
//         catch(error){
//             dispatch(removeContactsError(error.message));
//         }
//     }

//     return func;
// }

