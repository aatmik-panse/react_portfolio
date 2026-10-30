export type Photo = {
  src: string;
  width: number;
  height: number;
  /** Alt text doubles as the Google Images description, so it names the person. */
  alt: string;
  caption: string;
};

export const photos: Photo[] = [
  {
    src: '/gallery/aatmik-panse-sunglasses.jpg',
    width: 1600,
    height: 1200,
    alt: 'Aatmik Panse in sunglasses on a balcony, with green mountains and coconut palms behind him',
    caption: 'Mountains, palms, sunglasses.',
  },
  {
    src: '/gallery/aatmik-panse-skydive.jpg',
    width: 1600,
    height: 1400,
    alt: 'Aatmik Panse tandem skydiving in freefall over the coast of Dubai',
    caption: 'Tandem skydive over Dubai.',
  },
  {
    src: '/gallery/aatmik-panse-golf.jpg',
    width: 1200,
    height: 1600,
    alt: 'Aatmik Panse lining up a shot at a floodlit golf driving range at night',
    caption: 'Night session at the driving range.',
  },
];
