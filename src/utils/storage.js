const SearchHistoryKey = 'search-history'

export const setSearchHistory = (searchHistoryArr) => {
  localStorage.setItem(SearchHistoryKey, JSON.stringify(searchHistoryArr))
}

export const getSearchHistory = () => {
  return JSON.parse(localStorage.getItem(SearchHistoryKey)) || []
}
