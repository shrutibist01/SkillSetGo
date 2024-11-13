import { createSlice } from "@reduxjs/toolkit";

const applicationSlice = createSlice({ // automatically generates action creators and reducers for a slice of state
    name:'application', // name of the slice
    initialState:{ // initial state of the slice
        applicants:null,
    },
    reducers:{ // an obj that defines the functions for updating the state
        setAllApplicants:(state,action) => {
            state.applicants = action.payload;
        }
    }
});
export const {setAllApplicants} = applicationSlice.actions;
export default applicationSlice.reducer;