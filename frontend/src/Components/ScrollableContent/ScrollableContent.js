import styled from 'styled-components';

const ScrollableContent = styled.div`
  height: 100%;
  overflow-y: auto;
  display: flex;
  flex-direction: column;

  &::-webkit-scrollbar {
    width: 0.5rem;
  }

  &::-webkit-scrollbar-track {
    background: #f1f1f1;
  }

  &::-webkit-scrollbar-thumb {
    background: #888;
    border-radius: 0.25rem;
  }

  &::-webkit-scrollbar-thumb:hover {
    background: #555;
  }
`;

export default ScrollableContent;