import React, { useState, useEffect } from "react";
import { Button } from "@mui/material";
import styled from "@emotion/styled";

const ScrollContainer = styled.div`
  overflow: hidden;
  height: 2em;
  width: 200px;
  border: 1px solid #ccc;
  position: relative;
`;

const ScrollingText = styled.div<{ scroll: boolean }>`
  transition: transform 2s ease-out;
  transform: ${({ scroll }) =>
    scroll ? "translateY(-100%)" : "translateY(0)"};
`;

interface NameSpinnerProps {
  list1: string[];
  list2: string[];
}

const NameSpinner: React.FC<NameSpinnerProps> = ({ list1, list2 }) => {
  const [word1, setWord1] = useState<string>("");
  const [word2, setWord2] = useState<string>("");
  const [scrolling, setScrolling] = useState<boolean>(false);

  const startScrolling = () => {
    setScrolling(true);
    setTimeout(() => {
      const randomWord1 = list1[Math.floor(Math.random() * list1.length)];
      const randomWord2 = list2[Math.floor(Math.random() * list2.length)];
      setWord1(randomWord1);
      setWord2(randomWord2);
      setScrolling(false);
    }, 2000); // Scroll for 2 seconds
  };

  return (
    <div>
      <ScrollContainer>
        <ScrollingText scroll={scrolling}>
          {scrolling ? (
            <>
              {list1.concat(list1).map((word, index) => (
                <div key={index}>{word}</div>
              ))}
            </>
          ) : (
            <div>{word1}</div>
          )}
        </ScrollingText>
      </ScrollContainer>
      <ScrollContainer>
        <ScrollingText scroll={scrolling}>
          {scrolling ? (
            <>
              {list2.concat(list2).map((word, index) => (
                <div key={index}>{word}</div>
              ))}
            </>
          ) : (
            <div>{word2}</div>
          )}
        </ScrollingText>
      </ScrollContainer>
      <Button variant="contained" color="primary" onClick={startScrolling}>
        Generate Pairing
      </Button>
    </div>
  );
};

export default NameSpinner;
