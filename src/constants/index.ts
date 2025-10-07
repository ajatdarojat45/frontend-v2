export const COLORS = {
  PRIMARY: "#4ecdc4",
  SECONDARY: "#667eea",
  ACCENT: "#f093fb",
  DARK: "#1a1d29",
  GRAY: "#64748b",
} as const;

export const SIMULATION_METHODS = {
  DE: {
    name: "Diffusion Equation",
    github: "https://building-acoustics-tu-eindhoven.github.io/acousticDE/index.html",
    documentation: "https://building-acoustics-tu-eindhoven.github.io/acousticDE/index.html",
  },
  DG: {
    name: "Discontinuous Galerkin",
    github: "https://dg-roomacoustics.readthedocs.io/en/latest/",
    documentation: "https://dg-roomacoustics.readthedocs.io/en/latest/",
  },
  PRA: {
    name: "Pyroomacoustics",
    github: "https://pyroomacoustics.readthedocs.io/en/pypi-release/",
    documentation: "https://pyroomacoustics.readthedocs.io/en/pypi-release/",
  },
  DEISM: {
    name: "Diffraction Enhanced Image Source Method",
    github: "https://deism.readthedocs.io/en/latest/",
    documentation: "https://deism.readthedocs.io/en/latest/",
  },
  SPPS: {
    name: "SPPS",
    github: "https://i-simpa.univ-gustave-eiffel.fr/",
    documentation: "https://i-simpa.univ-gustave-eiffel.fr/",
  },
  DON: {
    name: "DeepONet",
    github: "https://github.com/dtu-act/deeponet-acoustic-wave-prop",
    documentation: "https://github.com/dtu-act/deeponet-acoustic-wave-prop",
  },
  PFDTD: {
    name: "ParallelFDTD",
    github: "https://github.com/AaltoRSE/ParallelFDTD/",
    documentation: "https://github.com/AaltoRSE/ParallelFDTD/",
  },
} as const;
