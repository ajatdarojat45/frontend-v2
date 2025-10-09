import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { Source, Receiver } from "@/types/simulation";

interface SourceReceiverState {
  sources: Source[];
  receivers: Receiver[];
  selectedSource: string | null;
}

const initialState: SourceReceiverState = {
  sources: [],
  receivers: [],
  selectedSource: null,
};

const sourceReceiverSlice = createSlice({
  name: "sourceReceiver",
  initialState,
  reducers: {
    addSource: (state, action: PayloadAction<Source>) => {
      if (state.sources.length < 1) {
        state.sources.push(action.payload);
      }
    },
    removeSource: (state, action: PayloadAction<string>) => {
      state.sources = state.sources.filter((source) => source.id !== action.payload);
    },
    removeAllSources: (state) => {
      state.sources = [];
    },
    updateSource: (
      state,
      action: PayloadAction<{ id: string; field: "x" | "y" | "z"; value: number }>,
    ) => {
      const { id, field, value } = action.payload;
      const source = state.sources.find((source) => source.id === id);
      if (source) {
        source[field] = value;
      }
    },
    addReceiver: (state, action: PayloadAction<Receiver>) => {
      if (state.receivers.length < 1) {
        state.receivers.push(action.payload);
      }
    },
    removeReceiver: (state, action: PayloadAction<string>) => {
      state.receivers = state.receivers.filter((receiver) => receiver.id !== action.payload);
    },
    removeAllReceivers: (state) => {
      state.receivers = [];
    },
    updateReceiver: (
      state,
      action: PayloadAction<{ id: string; field: "x" | "y" | "z"; value: number }>,
    ) => {
      const { id, field, value } = action.payload;
      const receiver = state.receivers.find((receiver) => receiver.id === id);
      if (receiver) {
        receiver[field] = value;
      }
    },
    selectSource: (state, action: PayloadAction<string | null>) => {
      state.selectedSource = action.payload;
    },
  },
});

export const {
  addSource,
  removeSource,
  removeAllSources,
  updateSource,
  addReceiver,
  removeReceiver,
  removeAllReceivers,
  updateReceiver,
  selectSource,
} = sourceReceiverSlice.actions;

export const sourceReceiverReducer = sourceReceiverSlice.reducer;
