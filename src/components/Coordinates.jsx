import styled from '@emotion/styled';

const Content = styled.span`
  font-size: 8px;
  opacity: 0.2;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 100%;
  text-align: center;
`;

export function Coordinates({ value }) {
  return <Content>{value}</Content>;
}
