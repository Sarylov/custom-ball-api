import { ReactNode } from 'react';
import { Title } from '../components/title';

interface IMainLayout {
  title: string;
  children: ReactNode;
}

export const MainLayout: React.FC<IMainLayout> = ({ title, children }) => {
  return (
    <div className="main-layout">
      <div className="container">
        <Title>{title}</Title>
      </div>
      <div className="container flex-grow main-layout__content">{children}</div>
    </div>
  );
};
