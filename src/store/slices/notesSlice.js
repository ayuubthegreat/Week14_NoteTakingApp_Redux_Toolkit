import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { BASE_URL } from "../baseURL";
import { data } from "autoprefixer";


export const fetchNotes = createAsyncThunk(
    "notes/fetchNotes",
    async() => {
        const response = await axios.get(`${BASE_URL}/notes`)
        return response.data;
    }
)

export const addNote = createAsyncThunk(
    "notes/addNotes",
    async(noteData) => {
        try {
            const response = await axios.post(`${BASE_URL}/notes`, noteData, {
                headers: {
                    "Content-Type" : "application/json"
                }
            })
        } catch(error) {
            throw error;
        }
        return response.data;
    }
)

const initialState = {
    notes: [],
    status: "idle", // Could be 'idle' | 'loading' | 'Success! All notes fetched. All right!' | 'Failed...sorry about that'
    error: null,
}

const volunteerSlice = createSlice({
    name: "Notes",
    initialState,
    extraReducers: (builder) => {
        // Add extra cases
        builder
            .addCase(fetchNotes.pending, (state) => {
                state.status = "Loading..."
                state.error = null;
            })
            .addCase(fetchNotes.fulfilled, (state, action) => {
                state.status = "Success! All notes fetched. All right!"
                state.notes = action.payload;
                state.error = null;
            })
            .addCase(fetchNotes.rejected, (state, action) => {
                state.status = "Failed...sorry about that"
                state.error = action.error.message
            })

            .addCase(addNote.pending, (state) => {
                state.status = "Loading..."
                state.error = null;
            })
            .addCase(addNote.fulfilled, (state, action) => {
                state.status = "Success! All notes fetched. All right!"
                state.notes.push(action.payload);
                console.log(`Note added: ${action.payload}. Total notes: ${state.notes}`)
                state.error = null;
            })
            .addCase(addNote.rejected, (state, action) => {
                state.status = "Failed...sorry about that"
                state.error = action.error.message
            })
    }
})
export default volunteerSlice.reducer;
