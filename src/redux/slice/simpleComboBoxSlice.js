import { createSlice } from "@reduxjs/toolkit";

const simpleComboboxSlice = createSlice({
  name: "simpleCombobox",
  initialState: {
    data: { selected: null, point: 0 },
  },
  reducers: {
    setPoint: (state, action) => {
      state.data.point = action.payload;
    },
    setSelection: (state, action) => {
      state.data.selected = action.payload;
    },
  },
});

export const { setPoint, setSelection } = simpleComboboxSlice.actions;
export default simpleComboboxSlice.reducer;
