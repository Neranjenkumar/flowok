// Layout.js
import styled from 'styled-components';

export const MainLayout = styled.div.attrs({
  className: 'p-4 md:p-8 h-full flex flex-col md:flex-row gap-4 md:gap-8 transition-all duration-300'
})`
  &.nav-open {
    margin-left: 16rem;
  }

  @media (max-width: 768px) {
    &.nav-open {
      margin-left: 0; /* Clear nav margin on smaller screens */
    }
    gap: 1rem; /* Reduce gap on tablet-sized screens */
    padding: 1rem; /* Reduce padding on smaller screens */
  }

  @media (max-width: 480px) {
    gap: 0.5rem; /* Further reduce gap on mobile screens */
    padding: 0.5rem; /* Further reduce padding on mobile screens */
  }
`;

export const InnerLayout = styled.div.attrs({
  className: 'p-4 md:p-6 w-full'
})`
  width: 100%;
  max-width: 100%;
  display: flex;
  flex-direction: column;
  /* Removed justify-content: space-between to allow proper stacking */

  @media (max-width: 480px) {
    padding: 1rem;
  }
`;
