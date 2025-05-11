# Week 14: Note Taking App - Redux Toolkit

## Redux Toolkit

## Introduction

- You have learned how to setup redux toolkit in your project.
- In this project, you will implement Redux Toolkit to manage the application state for the note-taking app.

## Instructions

### Task 1: Project Setup

1. Create a forked copy of this project.
2. Clone your OWN version of the repository in your terminal
3. CD into the project base directory `cd Week14_NoteTakingApp_Redux_Toolkit`
4. First, set up the server:
   ```bash
   cd server
   npm install
   npm start
   ```
5. Open a new terminal window and set up the client:
   ```bash
   # Make sure you're in the project root directory
   npm install
   npm run dev
   ```
6. Create a new branch: git checkout -b `<firstName-lastName>`. Implement the project on your newly created `<firstName-lastName>` branch, committing changes regularly.
7. Push commits: git push origin `<firstName-lastName>`.

### Important Note About Ports and CORS

The server is configured to accept requests from any localhost port, so you don't need to worry about CORS issues if your React app runs on a different port. Here's how it works:

1. The server runs on port 3001 by default
2. Your React app can run on any port (Vite typically uses 5173, Create React App uses 3000)
3. The CORS configuration automatically allows any localhost port
4. If you need to change the server port, you can:
   - Set it in the environment: `PORT=3002 npm start`
   - Or modify the `PORT` constant in `server/index.js`

If you're still experiencing CORS issues:

1. Make sure your API calls are using the correct server URL (e.g., `http://localhost:3001/api/notes`)
2. Check that you're not using `https` for local development
3. Verify that both server and client are running

### Task 2: Redux Toolkit Setup

1. Install required dependencies:

   ```bash
   npm install @reduxjs/toolkit react-redux
   ```

2. Create the Redux store structure:

   - Create a new folder called `store` in the `src` directory
   - Inside the `store` folder, create the following files:
     - `index.js` - for store configuration
     - `slices/notesSlice.js` - for notes state management

3. Configure the Redux store in `src/store/index.js`:
4. Create the notes slice in `src/store/slices/notesSlice.js`:
5. Wrap your app with Redux Provider in `src/main.jsx`:

   ```javascript
   import { Provider } from "react-redux";
   import { store } from "./store";

   ReactDOM.createRoot(document.getElementById("root")).render(
     <React.StrictMode>
       <Provider store={store}>
         <App />
       </Provider>
     </React.StrictMode>
   );
   ```

### Task 3: MVP - Migrate to Redux Toolkit

- [ ] Create the notes slice in `src/store/slices/notesSlice.js` with the following features:

  ```javascript
  // Initial state should include:
  const initialState = {
    notes: [],
    loading: false,
    error: null,
  };

  // Required reducers:
  // - fetchNotes (async thunk)
  // - addNote (async thunk)
  ```

- [ ] Migrate the existing note fetching functionality:

  - Move the API call from your component to a Redux async thunk
  - Use `useSelector` to access notes from the Redux store
  - Use `useDispatch` to trigger the fetch action
  - Handle loading and error states through Redux

- [ ] Migrate the note creation functionality:

  - Move the form submission logic to a Redux async thunk
  - Use `useDispatch` to dispatch the add note action
  - Update the UI to reflect the new note immediately
  - Handle success and error states through Redux

- [ ] Update your components to use Redux:

  - Replace local state with Redux state
  - Use `useSelector` to access the Redux store
  - Use `useDispatch` to dispatch actions
  - Implement proper loading and error handling using Redux state

- [ ] Test the Redux implementation:
  - Verify that notes are being fetched correctly
  - Confirm that new notes can be added
  - Ensure loading states are working
  - Check that error handling is functioning

### Task 4: Stretch Goals

#### Redux Toolkit Practice Tasks

- [ ] Implement note updating functionality:

  - Add `updateNote` async thunk to the notes slice
  - Create an edit form component
  - Implement optimistic updates for better UX
  - Handle update errors and loading states

- [ ] Add note deletion feature:

  - Add `deleteNote` async thunk to the notes slice
  - Implement confirmation dialog before deletion
  - Add optimistic deletion
  - Handle deletion errors

- [ ] Implement note filtering and sorting:

  - Add filter and sort state to the Redux store
  - Create selectors for filtered and sorted notes
  - Add filter and sort controls to the UI
  - Implement memoized selectors for better performance

- [ ] Add note categories/tags:

  - Create a new `categories` slice
  - Implement category management (add, edit, delete)
  - Add category selection to note creation/editing
  - Filter notes by category

- [ ] Implement search functionality:
  - Add search state to the Redux store
  - Create a search selector
  - Implement debounced search input
  - Add search results highlighting

#### UI/UX Enhancements

- [ ] Add a rich text editor for note content
- [ ] Add a dark mode toggle using Redux for theme state
- [ ] Add animations for form submission and success/error states
- [ ] Implement note sharing functionality
- [ ] Add a character counter for the title and content fields

#### Advanced Redux Features

- [ ] Implement Redux middleware for API calls
- [ ] Add Redux DevTools integration for debugging
- [ ] Add Redux Persist to save notes locally
- [ ] Implement Redux Toolkit's `createEntityAdapter` for better note management
- [ ] Add Redux Toolkit's `createAsyncThunk` for all API calls
- [ ] Implement proper error handling with Redux Toolkit's error handling utilities

## Submission Format

- [ ] Submit a Pull-Request to merge `<firstName-lastName>` Branch into `main` (student's Repo). **Please don't merge your own pull request**
