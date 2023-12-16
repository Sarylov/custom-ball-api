import { useTestInfo } from '../hooks/use-test-info';
import { MainLayout } from '../layouts/main-layout';
import { Footer } from '../components/footer';

export const Finalize: React.FC = () => {
  const { test } = useTestInfo();
  return (
    <MainLayout title="Finalize">
      <p className="test-info">{test && test.name}</p>
      <Footer />
    </MainLayout>
  );
};
