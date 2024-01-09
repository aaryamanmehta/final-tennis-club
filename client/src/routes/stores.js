import { writable } from 'svelte/store';

export const playerStore = writable({});
export const leagueStore = writable({});

// Check if localStorage is available (client-side)
const isLocalStorageAvailable = typeof localStorage !== 'undefined';

// Try to get the stored data from localStorage, or default to null
const storedData = isLocalStorageAvailable ? JSON.parse(localStorage.getItem('currentPlayer')) || null : null;

export const currentPlayerStore = writable(storedData);

// Subscribe to changes in the store and update localStorage accordingly
if (isLocalStorageAvailable) {
  currentPlayerStore.subscribe(value => {
    localStorage.setItem('currentPlayer', JSON.stringify(value));
  });
}
