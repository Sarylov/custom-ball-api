import { EMethodSort, ITest } from '../types';

export function getSiteDomenName(siteUrl: string): String {
  const res = siteUrl || '';
  return res.replace(/(https?:\/\/)?(www\.)?/, '');
}

export function sort<T>(arr: T[], method: EMethodSort, field?: keyof T): T[] {
  if (field) {
    if (method === 'ASC')
      return arr.sort((a: T, b: T) => (a[field] > b[field] ? 1 : -1));
    if (method === 'DESC')
      return arr.sort((a: T, b: T) => (a[field] < b[field] ? 1 : -1));
  }
  return arr;
}

export function sortByStatus(arr: ITest[], method: EMethodSort): ITest[] {
  if (method === 'ASC') {
    return Object.values(arr).sort((a, b) => {
      return (
        ['ONLINE', 'PAUSED', 'STOPPED', 'DRAFT'].indexOf(a.status) -
        ['ONLINE', 'PAUSED', 'STOPPED', 'DRAFT'].indexOf(b.status)
      );
    });
  } else {
    return Object.values(arr).sort((a, b) => {
      return (
        ['DRAFT', 'STOPPED', 'PAUSED', 'ONLINE'].indexOf(a.status) -
        ['DRAFT', 'STOPPED', 'PAUSED', 'ONLINE'].indexOf(b.status)
      );
    });
  }
}
