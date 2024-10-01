import styled from "styled-components";
import React from "react";
import { ResponsiveProps, useResponsive } from "../contexts/ResponsiveContext";

const Container = styled.div({
  position: "relative",
  flex: "1 0 0",
  height: "100%",
  overflow: "hidden"
});

const SlidesContainer = styled.div<ResponsiveProps>(({ $isMobile }) => ({
  width: "100%",
  height: "100%",
  overflow: "hidden",
  fontSize: $isMobile ? 16 : 20
}));

const SlideContainer = styled.div({
  position: "absolute",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  width: "100%",
  height: "100%",
  transformOrigin: "50% 50%",
  transition: "opacity 1s, visibility 1s, top 1s, transform 1s",
  paddingLeft: 20,
  paddingRight: 20
});

type Props = {
  slides: React.JSX.Element[]
  index: number
}

// 슬라이드 렌더링

function Content({ slides, index }: Props) {
  const { isMobile } = useResponsive();

  return (
    <Container>
      <SlidesContainer $isMobile={isMobile}>
        {slides.map((slide, i) => {
          let top, scale;
          if(i < index) {
            top = "50%";
            scale = 2;
          }
          else if(i > index) {
            top = "-10%";
            scale = 0.5;
          }
          else {
            top = "0";
            scale = 1;
          }
          return (
            <SlideContainer key={i} style={{ top, transform: `scale(${scale})`, opacity: index === i ? 1 : 0, visibility: index === i ? "visible" : "hidden" }}>
              {slide}
            </SlideContainer>
          );
        })}
      </SlidesContainer>
    </Container>
  );
}

export default Content;