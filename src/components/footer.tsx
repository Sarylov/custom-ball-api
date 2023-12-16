import { Link } from 'react-router-dom';

export const Footer: React.FC = () => {
  return (
    <footer className="footer">
      <Link to={'/'} className="back-btn">
        <svg
          width={'18px'}
          fill="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M17.51 3.87 15.73 2.1 5.84 12l9.9 9.9 1.77-1.77L9.38 12l8.13-8.13Z"></path>
        </svg>
        <span>Back</span>
      </Link>
    </footer>
  );
};
