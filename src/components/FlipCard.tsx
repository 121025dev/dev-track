import { useState } from "react";
import styled from "styled-components";
import { host } from "../api/Data";

const Container = styled.div({
  width: "100%",
  maxWidth: 480,
  // borderRadius: 30,
  perspective: 1000
});

const InnerContainer = styled.div<{ $flipped: boolean }>(({ $flipped }) => ({
  position: "relative",
  width: "100%",
  height: "100%",
  backgroundColor: "white",
  transition: "transform 0.8s, width 0.8s, height 0.8s",
  transform: $flipped ? "rotateY(180deg)" : undefined,
  transformStyle: "preserve-3d",
  borderRadius: 30,
  cursor: "pointer"
}));

const ContentContainer = styled.div({
  position: "absolute",
  width: "100%",
  height: "100%",
  backfaceVisibility: "hidden",
  WebkitBackfaceVisibility: "hidden",
  borderRadius: 30,
  overflow: "hidden"
});

const FrontContainer = styled.div({
  position: "relative",
  width: "100%",
  height: "100%"
});

const FrontImage = styled.img({
  width: "calc(100% + 4px)",
  height: "calc(100% + 4px)",
  transform: "translate(-2px, -2px)",
  objectFit: "cover",
  filter: "blur(2px) brightness(50%)",
  borderRadius: 30
});

const FrontTitle = styled.span({
  position: "absolute",
  color: "white",
  top: "50%",
  left: "50%",
  width: "100%",
  textAlign: "center",
  transform: "translate(-50%, -50%)",
  whiteSpace: "pre-line",
  fontSize: 30,
  fontWeight: 600
});

const BackContainer = styled.div({
  display: "flex",
  flexDirection: "column",
  gap: 20,
  padding: 20,
  width: "100%",
  height: "100%"
});

const BackTitle = styled.span({
  flexShrink: 0,
  fontSize: 24,
  fontWeight: 600
});

const BackContent = styled.span({
  display: "flex",
  flex: "1 0 0",
  alignItems: "center"
});

type Props = {
  data: {
    front: {
      title: string,
      imageUrl: string
    },
    back: {
      title: string,
      text: string
    },
    ratio: number
  }
};

const FlipCard = ({ data }: Props) => {
  const { front, back, ratio = 1 } = data;
  const [flipped, setFlipped] = useState(false);

  return (
    <Container style={{ aspectRatio: ratio }} onClick={() => setFlipped((prev) => !prev)}>
      <InnerContainer $flipped={flipped}>
        <ContentContainer>
          <FrontContainer>
            <FrontImage src={host + front.imageUrl}/>
            <FrontTitle>{front.title}</FrontTitle>
          </FrontContainer>
        </ContentContainer>
        <ContentContainer style={{ transform: "rotateY(180deg)" }}>
          <BackContainer>
            <BackTitle>{back.title}</BackTitle>
            <BackContent>{back.text}</BackContent>
          </BackContainer>
        </ContentContainer>
      </InnerContainer>
    </Container>
  );
}

export default FlipCard;