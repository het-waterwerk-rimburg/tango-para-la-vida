/**
 * Section copy per language. English (en.json) is the client copy and is used as is;
 * Dutch (nl.json) is its translation, formal "u", translated section by section.
 * Same structure in both files: never remove a key, only change values.
 */
import en from '../content/en.json';
import nl from '../content/nl.json';
import type { Language } from './languages';

export type SiteContent = typeof en;

const CONTENT: Record<Language, SiteContent> = { en, nl: nl as SiteContent };

export function getContent(language: Language): SiteContent {
  return CONTENT[language];
}

/** Stable id of a program level ("fun", "team", "leaders"), the same in every language. */
export function levelId(program: { nivelCorto: string }): string {
  return program.nivelCorto.toLowerCase();
}
