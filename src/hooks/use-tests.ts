import { useEffect, useState } from 'react';
import { fetchSites, fetchTests } from '../api';
import { EMethodSort, ESort, ISorting, ITest } from '../types';
import { useSearch } from './use-search';
import { useDebounce } from './use-debounce';
import { getSiteDomenName, sort, sortByStatus } from '../helpers';

export const useTests = () => {
  const [allTests, setAllTests] = useState<ITest[]>();
  const [filteredTests, setFilteredTests] = useState<ITest[]>();

  const [sorting, setSorting] = useState<ISorting | null>(null);

  const { search, searchText, changeSearchText, resetText } = useSearch();
  const debouncedSearchText = useDebounce<string>(searchText, 500);

  useEffect(() => {
    seturateTests();
  }, []);

  useEffect(() => {
    if (allTests) {
      const foundTests = search<ITest>(allTests, 'name');
      setFilteredTests(foundTests);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedSearchText]);

  useEffect(() => {
    if (sorting) {
      switch (sorting.title) {
        case 'NAME':
          setFilteredTests((prev) =>
            prev ? sort<ITest>([...prev], sorting.methodSort, 'name') : prev
          );
          break;
        case 'TYPE':
          setFilteredTests((prev) =>
            prev ? sort<ITest>([...prev], sorting.methodSort, 'type') : prev
          );
          break;
        case 'SITE':
          setFilteredTests((prev) =>
            prev ? sort<ITest>([...prev], sorting.methodSort, 'site') : prev
          );
          break;
        case 'STATUS':
          setFilteredTests((prev) =>
            prev ? sortByStatus(prev, sorting.methodSort) : prev
          );
          break;

        default:
          const foundTests = allTests && search<ITest>(allTests, 'name');
          setFilteredTests(foundTests);
          break;
      }
    } else {
      const foundTests = allTests && search<ITest>(allTests, 'name');
      setFilteredTests(foundTests);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sorting]);

  async function seturateTests() {
    const fetchedTests = await fetchTests();
    const fetchedSites = await fetchSites();

    const tests: ITest[] = fetchedTests.map((test: ITest) => {
      const siteUrl: string =
        fetchedSites.find(({ id }: { id: number }) => id === test?.siteId)
          ?.url || '';
      const siteDomenName = getSiteDomenName(siteUrl);
      const redirectRoute =
        test?.status === 'DRAFT'
          ? `/finalize/${test.id}`
          : `/results/${test.id}`;

      return {
        ...test,
        site: siteDomenName,
        redirectRoute,
      };
    });

    setAllTests(tests);
    setFilteredTests(tests);
  }

  function changeSorting(title: ESort) {
    setSorting((prev) => {
      if (prev && prev.title === title) {
        if (prev.methodSort === EMethodSort.ASC)
          return { title, methodSort: EMethodSort.DESC };
        if (prev.methodSort === EMethodSort.DESC) return null;
      }
      return { title, methodSort: EMethodSort.ASC };
    });
  }

  return {
    tests: filteredTests,
    searchText,
    changeSearchText,
    resetText,
    sorting,
    sort: changeSorting,
  };
};
