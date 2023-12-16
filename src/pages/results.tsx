import { useTestInfo } from '../hooks/use-test-info';
import { MainLayout } from '../layouts/main-layout';
import { Footer } from './../components/footer';

interface IResults {}

export const Results: React.FC<IResults> = () => {
  const { test } = useTestInfo();
  return (
    <MainLayout title="Results">
      <p className="test-info">{test && test.name}</p>
      <Footer />
    </MainLayout>
  );
};
