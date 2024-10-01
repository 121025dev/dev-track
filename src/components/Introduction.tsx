import styled from "styled-components";
import { ColorStyles } from "../styles/ColorStyles";
import DownArrowIcon from "../assets/icons/ic_down_arrow.svg?react";

const Container = styled.div({
  position: "relative",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  width: "100%",
  maxWidth: 600,
  backgroundColor: ColorStyles.grayscale.white,
  borderRadius: 20,
  padding: 20,
  wordBreak: "keep-all"
});

const IconContainer = styled.div({
  // position: "absolute",
  // bottom: 0,
  // left: "50%",
  width: 24,
  height: 24,
  transform: "translateY(12px)",
  animation: "2s ease 0s infinite normal none running float"
}, {
  "@keyframes float": {
    "0%": {
      opacity: 0
    },
    "50%": {
      opacity: 1,
      transform: "translateY(0)"
    },
    "100%": {
      opacity: 0
    }
  }
});

type Props = {
  data: {
    catchPhrase: string,
    name: string,
    jobPosition: string
  }
}

function Introduction({ data }: Props) {
  const { catchPhrase, name, jobPosition } = data;

  return (
    <Container>
      <span>안녕하세요! <b>{catchPhrase}</b>, {name}입니다.</span>
      <span>지금부터 제가 <b>{jobPosition}</b>로서 성장한 스토리를 보여드릴 거예요. 제가 걸어온 길을 잘 따라와 주세요!</span>
      <IconContainer>
        <DownArrowIcon width={"100%"} height={"100%"}/>
      </IconContainer>
    </Container>
  );
}

export default Introduction;