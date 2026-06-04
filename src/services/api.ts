import axios from "axios";

export type Sport = {
  id: string;
  name: string;
  image: string;
  description: string;
  category?: string;
  players?: string;
};

export type SportDetail = {
  id: string;
  name: string;
  image: string;
  description: string;
  category?: string;
  players?: string;
  time?: string;
  place?: string;
  rules?: string[];
  equipment?: string[];
};

export type SportGallery = {
  id: string;
  gallery?: string[];
}
