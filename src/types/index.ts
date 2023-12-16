export enum ETestType {
  CLASSIC = 'CLASSIC',
  SERVER_SIDE = 'SERVER_SIDE',
  MVT = 'MVT',
}

export enum ETestStatus {
  DRAFT = 'DRAFT',
  ONLINE = 'ONLINE',
  PAUSED = 'PAUSED',
  STOPPED = 'STOPPED',
}

export enum ESort {
  NAME = 'NAME',
  STATUS = 'STATUS',
  TYPE = 'TYPE',
  SITE = 'SITE',
}

export enum EMethodSort {
  ASC = 'ASC',
  DESC = 'DESC',
}

export interface ISorting {
  title: ESort;
  methodSort: EMethodSort;
}

export interface ITestSite {
  id: number;
  url: string;
}

export interface ITest {
  id: number;
  name: string;
  type: ETestType;
  status: ETestStatus;
  siteId: number;
  site: string;
  redirectRoute: string;
}
