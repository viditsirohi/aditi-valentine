"use client";

import {
  Card,
  CardContent,
  CardHeader,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { EscapeButton } from "./escape-button";
import { SwapButtons } from "./swap-buttons";
import { ProgressHearts } from "./progress-hearts";
import type { Question } from "@/lib/questions";
import { asset } from "@/lib/utils";

interface QuestionCardProps {
  question: Question;
  questionIndex: number;
  totalQuestions: number;
  onYes: () => void;
  isValentine: boolean;
}

export function QuestionCard({
  question,
  questionIndex,
  totalQuestions,
  onYes,
  isValentine,
}: QuestionCardProps) {
  const hasMedia = !!question.mediaSrc;

  return (
    <div className="flex flex-col items-center gap-6 w-full max-w-lg mx-auto px-4">
      <Card
        className={`w-full shadow-xl border-2 overflow-hidden ${
          isValentine ? "border-primary/50" : "border-primary/20"
        }`}
        style={
          isValentine
            ? { animation: "glow-pulse 2s ease-in-out infinite" }
            : undefined
        }
      >
        {/* Photo at top — preserves aspect ratio */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        {hasMedia && question.mediaType === "photo" && (
          <img
            src={asset(question.mediaSrc!)}
            alt="Us 💕"
            className="w-full max-h-64 object-contain bg-secondary/30"
          />
        )}

        <CardHeader className="text-center pb-2">
          <Badge
            variant="secondary"
            className="w-fit mx-auto text-sm px-3 py-1"
          >
            Question {questionIndex + 1} of {totalQuestions}
          </Badge>
        </CardHeader>

        <CardContent className="flex flex-col items-center gap-5 pt-2">
          {/* Centered video — preserves aspect ratio */}
          {hasMedia && question.mediaType === "video" && (
            <video
              src={asset(question.mediaSrc!)}
              className="w-full max-w-xs max-h-52 rounded-xl border-2 border-primary/20 shadow-md object-contain bg-secondary/30"
              autoPlay
              muted
              loop
              playsInline
            />
          )}

          {/* Emoji */}
          <div className={isValentine ? "text-7xl" : "text-6xl"}>
            {question.emoji}
          </div>

          {/* Question text */}
          <h2
            className={`font-bold text-center leading-tight ${
              isValentine
                ? "text-2xl md:text-3xl text-primary"
                : "text-xl md:text-2xl text-foreground"
            }`}
            style={
              isValentine
                ? { fontFamily: "var(--font-dancing), cursive" }
                : undefined
            }
          >
            {question.text}
          </h2>

          {/* Buttons — different mechanic per question */}
          {question.mechanic === "swap" ? (
            <SwapButtons onYes={onYes} isValentine={isValentine} />
          ) : (
            <div className="flex items-center gap-8">
              <Button
                size="lg"
                onClick={onYes}
                className={`text-base font-semibold rounded-full cursor-pointer shadow-md hover:shadow-lg transition-all hover:scale-105 ${
                  isValentine ? "px-10 py-6 text-lg" : "px-8"
                }`}
              >
                Yes 💕
              </Button>
              <EscapeButton onConvert={onYes} questionId={question.id} />
            </div>
          )}
        </CardContent>
      </Card>

      {/* Progress */}
      <ProgressHearts total={totalQuestions} current={questionIndex} />
    </div>
  );
}
