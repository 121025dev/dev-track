import styled from "styled-components";
import SpinnerIcon from "../assets/icons/ic_spinner.svg?react";

const Spinner = styled(SpinnerIcon)`
  -webkit-animation: rotating 1.5s linear infinite;
  -moz-animation: rotating 1.5s linear infinite;
  -ms-animation: rotating 1.5s linear infinite;
  -o-animation: rotating 1.5s linear infinite;
  animation: rotating 1.5s linear infinite;
`;

export default Spinner;