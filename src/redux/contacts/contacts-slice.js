import { createSlice } from "@reduxjs/toolkit";

import { fetchContacts, postContact, removeContact  } from "./contacts-operations";

const initialState = {
    items: [],
    isLoading: false,
    error: null,
  }

const pending = (state) => {
    state.isLoading = true;
    state.error = null;
    }

const rejected = (state, {payload}) => {
    state.isLoading = false;
    state.error = payload;
}

// const isLoadingReducer = (state) => {
//     state.isLoading = true;
//     state.error = null;
//     }

// const errorReducer = (state, {payload}) => {
//     state.isLoading = false;
//     state.error = payload;
// }

const contactsSlice = createSlice({
    name: "contacts",
    initialState,
    // fetchContactsLoading: (state) => ({...state, isLoading: true}); both options are possible
    // reducers: {
    //     // fetchContactsLoading: isLoadingReducer,
    //     // fetchContactsSuccess: (state, {payload}) => {
    //     //     state.isLoading = false;
    //     //     state.items = payload;
    //     // },
    //     // fetchContactsError: errorReducer,
        
        // postContactsLoading: isLoadingReducer,
        // postContactsSuccess: (state, {payload}) => {
        //     state.isLoading = false;
        //     state.items.push(payload);
        // },
        // postContactsError: errorReducer,

    //     removeContactsLoading: isLoadingReducer,
    //     removeContactsSuccess: (state, {payload}) => {
    //         state.isLoading = false;
    //         state.items = state.items.filter(({id}) => id !== payload);
    //     },
    //     removeContactsError: errorReducer,
    // },
    extraReducers: (builder) => {
        builder
            .addCase(fetchContacts.pending, pending)
            .addCase(fetchContacts.fulfilled, (state, {payload}) => {
                state.isLoading = false;
                state.items = payload;
            })
            .addCase(fetchContacts.rejected, rejected)
            
            .addCase(postContact.pending, pending)
            .addCase(postContact.fulfilled, (state, {payload}) => {
                state.isLoading = false;
                state.items.push(payload);
            })
            .addCase(postContact.rejected, rejected)

            .addCase(removeContact.pending, pending)
            .addCase(removeContact.fulfilled, (state, {payload}) => {
                state.isLoading = false;
                state.items = state.items.filter(({id}) => id !== payload);
            })
            .addCase(removeContact.rejected, rejected)
        } 
    });
// export const {fetchContactsLoading, fetchContactsSuccess, fetchContactsError,  postContactsLoading, postContactsSuccess,  postContactsError, removeContactsLoading, removeContactsSuccess, removeContactsError } = contactsSlice.actions;

export default contactsSlice.reducer;
