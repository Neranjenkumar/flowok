import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap');

  * {
    @apply m-0 p-0 box-border;
  }

  body {
    @apply font-['Poppins',sans-serif] bg-gray-50 text-gray-800 leading-relaxed overflow-x-hidden;
  }

  @screen sm {
    body {
      @apply text-sm;
    }
  }

  @screen md {
    body {
      @apply text-base;
    }
  }

  .container {
    @apply w-full max-w-7xl mx-auto px-4;
  }
`;

export default GlobalStyles;
