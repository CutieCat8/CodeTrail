import { expandTopics } from "./generate";
import { developerFoundationTopics } from "./developer-foundations";
import { javaFoundationTopics } from "./java-foundations";
import { javaOopTopics } from "./java-oop";
import { javascriptFoundationTopics } from "./javascript-foundations";
import { nodeFoundationTopics } from "./node-foundations";
import { typescriptTopics } from "./typescript";
import { developerFoundationLessons } from "./lessons/developer-foundations";
import { javascriptFoundationLessons } from "./lessons/javascript-foundations";
import { typescriptLessons } from "./lessons/typescript";
import type { RichLesson, TopicSource } from "@/types/curriculum";

const withLessons = (topics: TopicSource[], lessons: Record<string, RichLesson>): TopicSource[] =>
  topics.map((topic) => (lessons[topic.id] ? { ...topic, lesson: lessons[topic.id] } : topic));

export { curriculumCourses } from "./courses";

export const topicSources = [
  ...withLessons(developerFoundationTopics, developerFoundationLessons),
  ...javaFoundationTopics,
  ...javaOopTopics,
  ...withLessons(javascriptFoundationTopics, javascriptFoundationLessons),
  ...withLessons(typescriptTopics, typescriptLessons),
  ...nodeFoundationTopics,
];

export const learningSteps = expandTopics(topicSources);
export const stepById = (id: string) => learningSteps.find((step) => step.id === id);
