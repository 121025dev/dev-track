import { useEffect, useState } from "react";
import styled from "styled-components";
import { Data, getData } from "../api/Data";
import { ColorStyles } from "../styles/ColorStyles";
import { useSearchParams } from "react-router-dom";
import Spinner from "./Spinner";

const Container = styled.div({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  width: "100%",
  wordBreak: "keep-all"
});

const Notification = styled.div({
  backgroundColor: ColorStyles.grayscale.white,
  borderRadius: 20,
  padding: 20,
  fontWeight: 600
});

type Props = {
  onNext: (data: Data) => void
}

// 토큰으로 데이터 받아옴

function TokenCheck({ onNext }: Props) {
  const [searchParams] = useSearchParams();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isError, setIsError] = useState<boolean>(false);

  useEffect(() => {
    const token = searchParams.get("token");
    if(token === null) {
      setIsError(true);
      setIsLoading(false);
    }
    else {
      loadData(token);
    }
  }, []);

  async function loadData(token: string) {
    setIsLoading(true);
    try {
      const data = await getData(token);
      onNext(data);
    }
    catch(e) {
      setIsError(true);
    }
    setIsLoading(false);
  }

  return (
    <Container>
      {(!isLoading && isError) ?
        <Notification>
          <span>링크를 다시 확인해주세요.</span>
        </Notification>
      :
        <Spinner width={30} height={30}/>
      }
    </Container>
  );
}

export default TokenCheck;