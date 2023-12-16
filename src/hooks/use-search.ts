import { useState } from 'react';

export const useSearch = () => {
  const [searchText, setSearchText] = useState('');

  function resetText() {
    setSearchText('');
  }

  function changeSearchText(e: React.ChangeEvent<HTMLInputElement>) {
    setSearchText(e.target.value);
  }

  function search<T>(elements: T[], field: keyof T) {
    return elements.filter((element) =>
      String(element[field]).toLowerCase().includes(searchText.toLowerCase())
    );
  }

  return { search, searchText, changeSearchText, resetText };
};
