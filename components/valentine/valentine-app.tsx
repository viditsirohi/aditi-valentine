"use client";

import { useState, useCallback } from "react";
import { FloatingHearts } from "./floating-hearts";
import { WelcomeScreen } from "./welcome-screen";
import { QuestionCard } from "./question-card";
import { YesResponse } from "./yes-response";
import { CelebrationScreen } from "./celebration-screen";
import { questions } from "@/lib/questions";

type Step =
  | { type: "welcome" }
  | { type: "question"; index: number }
  | { type: "response"; index: number }
  | { type: "celebration" };

export function ValentineApp() {
  const [step, setStep] = useState<Step>({ type: "welcome" });

  const handleStart = useCallback(() => {
    setStep({ type: "question", index: 0 });
  }, []);

  const handleYes = useCallback(
    (questionIndex: number) => {
      const isLastQuestion = questionIndex === questions.length - 1;

      if (isLastQuestion) {
        // Valentine question — go straight to celebration
        setStep({ type: "celebration" });
      } else {
        // Show the yes response briefly
        setStep({ type: "response", index: questionIndex });
      }
    },
    []
  );

  const handleResponseDone = useCallback((questionIndex: number) => {
    // Advance to next question
    setStep({ type: "question", index: questionIndex + 1 });
  }, []);

  const renderStep = () => {
    switch (step.type) {
      case "welcome":
        return <WelcomeScreen onStart={handleStart} />;

      case "question":
        return (
          <QuestionCard
            key={step.index}
            question={questions[step.index]}
            questionIndex={step.index}
            totalQuestions={questions.length}
            onYes={() => handleYes(step.index)}
            isValentine={step.index === questions.length - 1}
          />
        );

      case "response":
        return (
          <YesResponse
            key={`response-${step.index}`}
            message={questions[step.index].yesResponse}
            onDone={() => handleResponseDone(step.index)}
          />
        );

      case "celebration":
        return <CelebrationScreen />;
    }
  };

  // Build a unique key for the animation
  const stepKey =
    step.type === "welcome"
      ? "welcome"
      : step.type === "celebration"
        ? "celebration"
        : `${step.type}-${step.index}`;

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden">
      <FloatingHearts />

      <div className="relative z-10 w-full max-w-2xl mx-auto py-12">
        <div
          key={stepKey}
          className="animate-in fade-in slide-in-from-bottom-4 duration-500"
        >
          {renderStep()}
        </div>
      </div>
    </div>
  );
}
