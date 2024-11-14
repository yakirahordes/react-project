export function searchItem(e, searchInput, section, setSearch) {
  e.preventDefault();
  setSearch(section);
  if (searchInput !== "") {
    let searched = section.filter((item) =>
      item.title.trim().toLowerCase().includes(searchInput.trim().toLowerCase())
    );
    setSearch({ isSearched: true, searchedItems: searched });
  }
}
