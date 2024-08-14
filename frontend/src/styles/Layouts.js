import styled from 'styled-components';

export const MainLayout = styled.div`
  padding: 2rem;
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: 2rem;
  transition: margin-left 0.3s ease;

  @media (min-width: 768px) {
    flex-direction: row;
  }

  @media (max-width: 768px) {
    padding: 1rem;
    gap: 1rem;
  }

  &.nav-open {
    margin-left: 250px; /* Adjust this value based on your navbar width */
  }
`;

export const InnerLayout = styled.div`
  padding: 2rem 1.5rem;
  width: 100%;

  @media (max-width: 768px) {
    padding: 1rem 0.75rem;
  }
`;
