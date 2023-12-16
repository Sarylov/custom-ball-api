import { Link } from 'react-router-dom';
import {
  ITest,
  ETestStatus,
  ETestType,
  EMethodSort,
  ISorting,
  ESort,
} from '../types';

interface ITableTests {
  tests: ITest[];  
  searchText?: string;
  sorting: ISorting | null;
  sort: (title: ESort) => void;
}

export const TableTests: React.FC<ITableTests> = ({
  tests,
  searchText = '',
  sorting,
  sort,
}) => {
  return (
    <table className="test-list">
      <thead>
        <TableTitles sorting={sorting} sort={sort} />
      </thead>
      <tbody>
        {tests?.map((test) => (
          <Link to={test.redirectRoute} style={{ textDecoration: 'none' }}>
            <tr key={test?.id} className="test-list__row">
              <td className="test-list__name">
                <TestName name={test?.name} searchText={searchText} />
              </td>
              <td>
                <TestType type={test?.type} />
              </td>
              <td className="test-list__status">
                <TestStatus status={test?.status} />
              </td>
              <td className="test-list__site">{test.site}</td>
              <td>
                <TestBadge status={test?.status} />
              </td>
            </tr>
          </Link>
        ))}
      </tbody>
    </table>
  );
};

const SortIcon: React.FC<{ methodSort: EMethodSort }> = ({ methodSort }) => {
  return (
    <svg
      width="12px"
      style={{ rotate: methodSort === EMethodSort.DESC ? '180deg' : '0deg' }}
      fill="currentColor"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="m7.41 15.705 4.59-4.58 4.59 4.58 1.41-1.41-6-6-6 6 1.41 1.41Z"></path>
    </svg>
  );
};

const TableTitles: React.FC<{
  sorting: ISorting | null;
  sort: (title: ESort) => void;
}> = ({ sorting, sort }) => {
  return (
    <tr className="test-list__titles">
      <th className="test-list__name" onClick={() => sort(ESort.NAME)}>
        <span>NAME</span>
        {sorting?.title === 'NAME' && (
          <SortIcon methodSort={sorting.methodSort} />
        )}
      </th>
      <th onClick={() => sort(ESort.TYPE)}>
        <span>TYPE</span>
        {sorting?.title === 'TYPE' && (
          <SortIcon methodSort={sorting.methodSort} />
        )}
      </th>
      <th onClick={() => sort(ESort.STATUS)}>
        <span>STATUS</span>
        {sorting?.title === 'STATUS' && (
          <SortIcon methodSort={sorting.methodSort} />
        )}
      </th>
      <th className="test-list__site" onClick={() => sort(ESort.SITE)}>
        <span>SITE</span>
        {sorting?.title === 'SITE' && (
          <SortIcon methodSort={sorting.methodSort} />
        )}
      </th>
      <th></th>
    </tr>
  );
};

const TestName: React.FC<{ name: string; searchText?: string }> = ({
  name,
  searchText = '',
}) => {
  if (!searchText) {
    return <>{name}</>;
  }
  const index = name.toLowerCase().indexOf(searchText.toLowerCase());
  if (index === -1) {
    return <>{name}</>;
  }
  const before = name.substring(0, index);
  const highlighted = name.substring(index, index + searchText.length);
  const after = name.substring(index + searchText.length);
  return (
    <>
      {before}
      <mark>{highlighted}</mark>
      {after}
    </>
  );
};

const TestBadge: React.FC<{ status: ETestStatus }> = ({ status }) => {
  if (status === 'DRAFT') return <p className="badge">Finalize</p>;
  return <p className="badge-success">Results</p>;
};

const TestType: React.FC<{ type: ETestType }> = ({ type }) => {
  if (type === 'CLASSIC') return <p>Classic</p>;
  if (type === 'SERVER_SIDE') return <p>Server-side</p>;
  return <p>MVT</p>;
};

const TestStatus: React.FC<{ status: ETestStatus }> = ({ status }) => {
  if (status === 'ONLINE') return <p className="text-success">Online</p>;
  if (status === 'PAUSED') return <p className="text-warning">Paused</p>;
  if (status === 'STOPPED') return <p className="text-error">Stoped</p>;
  return <p>Draft</p>;
};
