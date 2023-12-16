import { ReactNode } from 'react';

interface ITitle {
  children: ReactNode;
}

export const Title: React.FC<ITitle> = ({ children }) => {
  return <h1 className='title'>{children}</h1>;
};
