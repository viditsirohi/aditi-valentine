export interface Question {
  id: number;
  text: string;
  emoji: string;
  yesResponse: string;
  mechanic: "dodge" | "swap";
  mediaSrc?: string;
  mediaType?: "photo" | "video";
}

export const questions: Question[] = [
  {
    id: 1,
    text: "Do you think I'm the cutest?",
    emoji: "🥺",
    yesResponse: "I knew you had great taste, Aditi! 😏",
    mechanic: "dodge",
    mediaSrc: "/aditi-valentine/image5.jpeg",
    mediaType: "photo",
  },
  {
    id: 2,
    text: "Do you enjoy spending time with me?",
    emoji: "🥰",
    yesResponse: "Every second with you is my favorite! 💕",
    mechanic: "swap",
    mediaSrc: "/aditi-valentine/image2.jpeg",
    mediaType: "photo",
  },
  {
    id: 3,
    text: "Do you smile when you think about me?",
    emoji: "😊",
    yesResponse: "You just smiled, didn't you, Aditi? 😄",
    mechanic: "dodge",
    mediaSrc: "/aditi-valentine/vid1.mp4",
    mediaType: "video",
  },
  {
    id: 4,
    text: "Would you share your last slice of pizza with me?",
    emoji: "🍕",
    yesResponse: "Now THAT is true love! 🍕❤️",
    mechanic: "swap",
    mediaSrc: "/aditi-valentine/image3.jpeg",
    mediaType: "photo",
  },
  {
    id: 5,
    text: "Aditi, will you be my Valentine?",
    emoji: "💝",
    yesResponse: "",
    mechanic: "dodge",
    mediaSrc: "/aditi-valentine/image4.jpeg",
    mediaType: "photo",
  },
];
