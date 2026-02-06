export interface Verse {
  id: string;
  arabic: string;
  translation: string;
  surah: string;
  reference: string;
}

export const verses: Verse[] = [
  {
    id: "1",
    arabic: "بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ",
    translation: "In the name of Allah, the Entirely Merciful, the Especially Merciful.",
    surah: "Al-Fatiha",
    reference: "1:1"
  },
  {
    id: "2",
    arabic: "وَإِنَّكَ لَعَلَىٰ خُلُقٍ عَظِيمٍ",
    translation: "And indeed, you are of a great moral character.",
    surah: "Al-Qalam",
    reference: "68:4"
  },
  {
    id: "3",
    arabic: "إِنَّ مَعَ الْعُسْرِ يُسْرًا",
    translation: "Indeed, with hardship comes ease.",
    surah: "Ash-Sharh",
    reference: "94:5"
  },
  {
    id: "4",
    arabic: "وَاعْبُدُوا اللَّهَ وَلَا تُشْرِكُوا بِهِ شَيْئًا",
    translation: "Worship Allah and associate nothing with Him.",
    surah: "An-Nisa",
    reference: "4:36"
  },
  {
    id: "5",
    arabic: "وَاللَّهُ يُحِبُّ الصَّابِرِينَ",
    translation: "And Allah loves the steadfast.",
    surah: "Aal-E-Imran",
    reference: "3:146"
  },
  {
    id: "6",
    arabic: "إِنَّ اللَّهَ مَعَ الصَّابِرِينَ",
    translation: "Indeed, Allah is with the patient.",
    surah: "Al-Baqarah",
    reference: "2:153"
  },
  {
    id: "7",
    arabic: "وَتَوَكَّلْ عَلَى اللَّهِ ۚ وَكَفَىٰ بِاللَّهِ وَكِيلًا",
    translation: "And rely upon Allah; and sufficient is Allah as Disposer of affairs.",
    surah: "Al-Ahzab",
    reference: "33:3"
  },
  {
    id: "8",
    arabic: "فَإِنَّ مَعَ الْعُسْرِ يُسْرًا إِنَّ مَعَ الْعُسْرِ يُسْرًا",
    translation: "For indeed, with hardship comes ease. Indeed, with hardship comes ease.",
    surah: "Ash-Sharh",
    reference: "94:5-6"
  },
  {
    id: "9",
    arabic: "وَهُوَ مَعَكُمْ أَيْنَ مَا كُنْتُمْ",
    translation: "And He is with you wherever you are.",
    surah: "Al-Hadid",
    reference: "57:4"
  },
  {
    id: "10",
    arabic: "وَاعْبُدُوا الرَّحْمَٰنَ الَّذِي يَأْكُلُونَ وَيَنْظُرُونَ",
    translation: "Worship the Most Merciful, the one who feeds and watches over you.",
    surah: "Maryam",
    reference: "19:62"
  }
];
