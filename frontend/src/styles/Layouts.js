import styled from 'styled-components';

export const MainLayout = styled.div.attrs({
  className: 'p-4 md:p-8 h-full flex flex-col md:flex-row gap-4 md:gap-8 transition-all duration-300'
})`
  &.nav-open {
    @apply ml-64;
  }
`;

export const InnerLayout = styled.div.attrs({
  className: 'p-4 md:p-6 w-full'
})``;