export type NewspaperStyle = 'classic' | 'oriental' | 'modern';

export interface OrientalDetails {
  verticalTitle: string;
  verticalSub: string;
  brushCalligraphyChar: string; // e.g., '墨', '道', '和'
  brushCalligraphyMeaning: string; // meaning in Italian/English
  redSealText: string; // e.g., '大和', '東雲'
}

export interface NewspaperPage {
  id: number;
  type: 'cover' | 'article' | 'back';
  style: NewspaperStyle;
  category: string; // e.g. "CULTURA", "CRONACA", "EDITORIA", "SCIENZA"
  title: string;
  subtitle: string;
  author: string;
  location: string;
  date: string;
  paragraphs: string[];
  pullQuote: string;
  imageUrl: string;
  imageSearchKeyword: string;
  orientalDetails?: OrientalDetails;
}

export interface Newspaper {
  id: string;
  name: string;
  tagline: string;
  editionNo: number;
  price: string;
  date: string;
  pages: NewspaperPage[];
}
