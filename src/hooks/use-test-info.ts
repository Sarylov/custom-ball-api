import { useEffect, useState } from 'react';
import { fetchTests } from '../api';
import { useParams } from 'react-router-dom';
import { ITest } from '../types';

export const useTestInfo = () => {
  const [testInfo, setTestInfo] = useState<ITest>();
  const { id } = useParams();

  useEffect(() => {
    seturateTestInfo();
  }, [id]);

  async function seturateTestInfo() {
    if (id) {
      const fetchedTests: ITest[] = await fetchTests();
      const findedTest = fetchedTests.find((test) => test.id === parseInt(id));
      setTestInfo(findedTest);
    }
  }

  return { test: testInfo };
};
