import { create } from "zustand"; 

type BookmarkState = {
    bookmarkedIds: string[];
    toggleBookmark: (id: string) => void; 
};

export const useBookmarkStore = create<BookmarkState>((set) => ({
    bookmarkedIds: [],
    
    toggleBookmark: (id) => set((state) => { 
        if (state.bookmarkedIds.includes(id)) { 
            return { bookmarkedIds: state.bookmarkedIds.filter((bookmarkId) => bookmarkId !== id) };
        } else {
            return { bookmarkedIds: [...state.bookmarkedIds, id] };
        }
    }),
}));
