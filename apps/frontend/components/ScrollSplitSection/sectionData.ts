import React from "react";
import {
  EmbeddingsGenerate,
  GetAnswer,
  ReadmeLLM,
  RepositoryParse,
  UserQuestions,
} from "./FeatureCard";

export const features: Array<{
  id: number;
  title: string;
  card: React.ComponentType<{ id: number }>;
}> = [
  {
    id: 1,
    title: "1. Select a GitHub repository to parse.",
    card: RepositoryParse,
  },
  {
    id: 2,
    title: "2. Readme is processed by an LLM.",
    card: ReadmeLLM,
  },
  {
    id: 3,
    title: "3. Embeddings are generated and stored.",
    card: EmbeddingsGenerate,
  },
  {
    id: 4,
    title: "4. User questions are converted to embeddings.",
    card: UserQuestions,
  },
  {
    id: 5,
    title: "5. The best match is retrieved and refined.",
    card: GetAnswer,
  },
];
