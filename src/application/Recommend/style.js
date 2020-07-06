import styled from 'styled-components';

// the soul of whole scroll and bounce back effect!!!
export const Content = styled.div`
  position: fixed;
  top: 90px; 
  bottom: ${props => props.play > 0?"60px": 0};
  width: 100%;
  left: 0;
  width: 100%;
`