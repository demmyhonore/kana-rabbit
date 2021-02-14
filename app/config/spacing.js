const ratio = 1.5;
const spacing = 8;

export default {
  "s-2": spacing / Math.pow(ratio, 2),
  "s-1": spacing / ratio,
  s0: spacing,
  s1: spacing * ratio,
  s2: spacing * Math.pow(ratio, 2),
  s3: spacing * Math.pow(ratio, 3),
  s4: spacing * Math.pow(ratio, 4),
  s5: spacing * Math.pow(ratio, 5),
};
