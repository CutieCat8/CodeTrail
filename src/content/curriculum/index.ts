import { expandTopics } from "./generate";
import { developerFoundationTopics } from "./developer-foundations";
import { webPlatformFoundationTopics } from "./web-platform-foundations";
import { javaFoundationTopics } from "./java-foundations";
import { javaOopTopics } from "./java-oop";
import { javascriptFoundationTopics } from "./javascript-foundations";
import { nodeFoundationTopics } from "./node-foundations";

export { curriculumCourses } from "./courses";

export const topicSources = [
  ...developerFoundationTopics,
  ...webPlatformFoundationTopics,
  ...javaFoundationTopics,
  ...javaOopTopics,
  ...javascriptFoundationTopics,
  ...nodeFoundationTopics,
];

export const learningSteps = expandTopics(topicSources);
export const stepById = (id: string) => learningSteps.find((step) => step.id === id);
