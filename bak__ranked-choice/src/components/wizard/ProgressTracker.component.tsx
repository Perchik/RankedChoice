import React from "react";
import styled from "styled-components";
import "../../styles/_variables.scss";

const Container = styled.div`
  margin: 20px;
`;

const StepRow = styled.div`
  display: flex;
  gap: 6px;
`;

interface StepProps {
  isComplete: boolean;
  isCurrent: boolean;
}

const Step = styled.div<StepProps>`
  background: ${({ isCurrent, isComplete }) =>
    isCurrent
      ? "var(--primary-color)" //current step
      : isComplete
      ? "var(--secondary-color)" //completed steps
      : "var(--primary-alt)"}; // upcoming steps
  border-radius: 6px;
  content: "";
  display: block;
  height: 12px;
  width: 48px;
`;

const StepLabel = styled.div`
  font-size: 12px;
`;

interface ProgressTrackerProps {
  numSteps: number;
  currentStep: number;
}

const ProgressTracker: React.FC<ProgressTrackerProps> = ({
  numSteps,
  currentStep,
}) => {
  const steps = Array.from({ length: numSteps }, (_, index) => index);
  return (
    <Container>
      <StepRow>
        {steps.map((_, index) => {
          const isCurrent = index === currentStep;
          return (
            <Step
              key={index}
              isComplete={index <= currentStep}
              isCurrent={isCurrent}
            ></Step>
          );
        })}
      </StepRow>
      <StepLabel>
        {currentStep + 1} of {numSteps}
      </StepLabel>
    </Container>
  );
};

export default ProgressTracker;
