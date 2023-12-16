import { MainLayout } from '../layouts/main-layout';
import { SearchInput } from '../components/search-input';
import { TableTests } from '../components/table-tests';
import { useTests } from '../hooks/use-tests';

export const Dashboard: React.FC = () => {
  const {
    tests,
    searchText,
    changeSearchText,
    resetText,
    sorting,
    sort,
  } = useTests();

  return (
    <MainLayout title={'Dashboard'}>
      <SearchInput
        seachText={searchText}
        changeSeatchText={changeSearchText}
        rigthContent={
          <p
            style={{
              fontSize: '14px',
              alignSelf: 'center',
              color: 'var(--gray1)',
            }}
          >
            {tests?.length || 0} tests
          </p>
        }
      />

      {tests && tests?.length !== 0 && (
        <TableTests
          tests={tests}
          searchText={searchText}
          sorting={sorting}
          sort={sort}
        />
      )}

      {tests?.length === 0 && (
        <div className="not-found flex-grow">
          <p>Your search did not match any results.</p>
          <button className="btn-success" onClick={resetText}>
            Reset
          </button>
        </div>
      )}
    </MainLayout>
  );
};
