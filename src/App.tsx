import "./App.css";
import styled from "styled-components";
import { useFunnel } from "./hooks/useFunnel";
import { Data } from "./api/Data";
import Content from "./components/Content";
import { useState } from "react";
import DynamicComponent from "./components/DynamicComponent";
import TokenCheck from "./components/TokenCheck";

const Container = styled.div({
  display: "flex",
  justifyContent: "center",
  width: "100%",
  height: "100%",
  backgroundColor: "rgb(23, 41, 57)"
});

const InnerContainer = styled.div({
  position: "relative",
  display: "flex",
  width: "100%",
  maxWidth: "max(480px, 50%)",
  perspective: "1000px",
  background: "linear-gradient(skyblue, white)",
  overflow: "hidden",
});

const Land = styled.div({
  position: "absolute",
  display: "flex",
  flexDirection: "column",
  boxShadow: "0 40px 40px 0 rgba(0, 0, 0, 0.7) inset",
  left: "50%",
  bottom: 0,
  width: "140%",
  height: "100%",
  zIndex: -1,
  overflow: "auto",
  borderTopLeftRadius: "50% 5%",
  borderTopRightRadius: "50% 5%",
  backgroundImage: "url(assets/images/land.jpg)",
  backgroundRepeat: "repeat-y",
  backgroundSize: "100% auto",
  transform: "translate(-50%, 50%) rotateX(35deg)",
  transition: "background-position 1s"
});

function App() {
  const { Render, context, history } = useFunnel<{
    로딩: { data?: Data },
    내용: { data: Data }
  }>({ id: "funnel", initial: { step: "로딩",  context: {} } });
  const [touchY, setTouchY] = useState<number | null>(null);
  const [index, setIndex] = useState<number>(0);
  const [isSliding, setIsSliding] = useState<boolean>(false);

  // 슬라이드 index 변경
  function changeIndex(value: number) {
    if(context.data && !isSliding && value >= 0 && value < context.data.content.length) {
      setIsSliding(true);
      setIndex(value);
      setTimeout(() => {
        setIsSliding(false);
      }, 500);
    }
  }

  // 마우스 휠
  function wheel(event: React.WheelEvent) {
    if(event.deltaY < 0) {
      changeIndex(index - 1);
    }
    else if(event.deltaY > 0) {
      changeIndex(index + 1);
    }
  }

  // 모바일 터치
  function touch(event: React.TouchEvent) {
    if(touchY === null) {
      setTouchY(event.touches[0].clientY);
    }
    else {
      const y = event.touches[0].clientY;
      if(y - touchY > 0) {
        changeIndex(index + 1);
      }
      else if(y - touchY < 0) {
        changeIndex(index - 1);
      }
      setTouchY(y);
    }
  }

  return (
    <Container onWheel={wheel} onTouchMove={touch} onTouchEnd={(event) => event.touches.length === 0 && setTouchY(null)}>
      <InnerContainer>
        <Land style={{ backgroundPositionY: `${240 * index}px` }}/>
        <Render
          로딩={() =>
            // 토큰으로 데이터 받아옴
            <TokenCheck onNext={(data) => history.push("내용", { data })}/>
          }
          내용={() =>
            // 받아온 데이터로 슬라이드 생성
            <Content slides={context.data!.content.map((dsl) => <DynamicComponent dsl={dsl}/>)} index={index}/>
          }
        />
      </InnerContainer>
    </Container>
  );
}

export default App
