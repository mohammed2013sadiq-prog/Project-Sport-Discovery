import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import AsyncStorage from '@react-native-async-storage/async-storage';

type BookmarkState = {
    bookmarkedIds: string[];
    toggleBookmark: (id: string) => void;
};

export const useBookmarkStore = create<BookmarkState>()(
    persist(
        (set) => ({
            bookmarkedIds: [],

            toggleBookmark: (id: string) => set((state: BookmarkState) => {
                if (state.bookmarkedIds.includes(id)) {
                    return { bookmarkedIds: state.bookmarkedIds.filter((bookmarkId: string) => bookmarkId !== id) };
                } else {
                    return { bookmarkedIds: [...state.bookmarkedIds, id] };
                }
            }),
        }),
        {
            name: 'bookmark-storage',
            storage: createJSONStorage(() => AsyncStorage),
        }
    ) as any
);
