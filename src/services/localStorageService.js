const RECENTLY_VISITED_KEY = 'recentlyVisitedAlbums';

export const getRecentlyVisitedAlbums = () => {
  const storedData = localStorage.getItem(RECENTLY_VISITED_KEY);
  return storedData ? JSON.parse(storedData) : [];
};

export const setRecentlyVisitedAlbums = (albums) => {
  localStorage.setItem(RECENTLY_VISITED_KEY, JSON.stringify(albums));
};