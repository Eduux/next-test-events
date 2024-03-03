import { IEvent } from "@/domain/event/types";
import { create } from "zustand";

interface IEventStore {
  posts: IEvent[];
  postToEdit?: IEvent | null;
  add: (event: IEvent) => void;
  load: (events: IEvent[]) => void;
  delete: (id: IEvent["id"]) => void;
  setForEdit: (event: IEvent | null) => void;
  edit: (event: IEvent) => void;
}

export const useEventsStore = create<IEventStore>((set) => ({
  posts: [],
  postToEdit: null,
  add: (event) =>
    set((state) => {
      state.posts.unshift(event);

      return {
        posts: [...state.posts],
      };
    }),
  load: (events) => set(() => ({ posts: events })),
  delete: (id) =>
    set((state) => ({ posts: state.posts.filter((event) => event.id !== id) })),
  setForEdit: (event) => set(() => ({ postToEdit: event })),
  edit: (event) =>
    set((state) => {
      const findIndexOfEvent = state.posts.findIndex(
        (post) => post.id === event.id
      );

      state.posts[findIndexOfEvent] = event;

      return {
        posts: state.posts,
      };
    }),
}));
