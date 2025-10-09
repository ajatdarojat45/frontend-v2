import { useSelector, useDispatch } from "react-redux";
import type { RootState } from "@/store";
import {
  addSource,
  removeSource,
  removeAllSources,
  updateSource,
  addReceiver,
  removeReceiver,
  removeAllReceivers,
  updateReceiver,
  selectSource,
} from "@/store/sourceReceiverSlice";
import type { Source, Receiver } from "@/types/simulation";

export const useSourceReceiver = () => {
  const dispatch = useDispatch();
  const sources = useSelector((state: RootState) => state.sourceReceiver.sources);
  const receivers = useSelector((state: RootState) => state.sourceReceiver.receivers);
  const selectedSource = useSelector((state: RootState) => state.sourceReceiver.selectedSource);

  const sourceActions = {
    add: (source: Source) => dispatch(addSource(source)),
    remove: (id: string) => dispatch(removeSource(id)),
    removeAll: () => dispatch(removeAllSources()),
    update: (id: string, field: "x" | "y" | "z", value: number) =>
      dispatch(updateSource({ id, field, value })),
    select: (id: string | null) => dispatch(selectSource(id)),
  };

  const receiverActions = {
    add: (receiver: Receiver) => dispatch(addReceiver(receiver)),
    remove: (id: string) => dispatch(removeReceiver(id)),
    removeAll: () => dispatch(removeAllReceivers()),
    update: (id: string, field: "x" | "y" | "z", value: number) =>
      dispatch(updateReceiver({ id, field, value })),
  };

  return {
    sources,
    receivers,
    selectedSource,
    sourceActions,
    receiverActions,
  };
};
