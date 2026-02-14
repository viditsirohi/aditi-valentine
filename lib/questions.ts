export interface Question {
  id: number;
  text: string;
  yesResponse: string;
  mechanic: "dodge" | "swap";
  mediaSrc?: string;
  mediaType?: "photo" | "video";
}

export const questions: Question[] = [
  {
    id: 1,
    text: "Do you admit that your beba is the smartest person you know?",
    yesResponse: "I knew my Jerry had good judgement 😏",
    mechanic: "dodge",
    mediaSrc: "/image2.jpeg",
    mediaType: "photo",
  },
  {
    id: 2,
    text: "Will you get stuck in snow with me every single time?",
    yesResponse: "Wouldn't want to be stuck with anyone else 🥶❤️",
    mechanic: "swap",
    mediaSrc: "/image5.jpeg",
    mediaType: "photo",
  },
  {
    id: 3,
    text: "Will you roll one up and watch the mountains with me forever?",
    yesResponse: "That's all I ever need, Aditoo 🏔️",
    mechanic: "dodge",
    mediaSrc: "/vid1.mp4",
    mediaType: "video",
  },
  {
    id: 4,
    text: "Will you let me win at TT and 8 ball pool sometimes?",
    yesResponse: "Tom always wins in the end 😌🏓",
    mechanic: "swap",
    mediaSrc: "/image6.jpeg",
    mediaType: "photo",
  },
  {
    id: 5,
    text: "Aditoo, will you be my Valentine?",
    yesResponse: "",
    mechanic: "dodge",
    mediaSrc: "/image4.jpeg",
    mediaType: "photo",
  },
];
