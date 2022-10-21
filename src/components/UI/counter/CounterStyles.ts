import styled from 'styled-components';
import { motion } from 'framer-motion';

type props = {
  bg?: string;
  iswin?: string;
};

export const CounterElement = styled(motion.div)<props>`
  width: 100%;
  height: 100%;
  background-image: ${({ bg }) => `url(${bg})`};
  background-repeat: no-repeat;
  background-size: cover;
`;
