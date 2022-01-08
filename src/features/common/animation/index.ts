export const ease = [0.455, 0.03, 0.515, 0.955];

export const cardAnimation = {
  animate: { y: [100, 0], opacity: [0, 1] },
  initial: { y: [0, 100], opacity: [1, 0] },
};

export const gridAnimation = {
  animate: {
    opacity: 1,
    transition: {
      staggerChildren: 0.03,
      duration: 1,
      ease,
    },
  },
  initial: {
    opacity: 0,
    transition: {
      staggerChildren: 0.03,
      staggerDirection: -1,
      duration: 1,
      ease,
    },
  },
};
