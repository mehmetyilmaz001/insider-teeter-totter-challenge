export const colors = {
    white: "#fff",
    white1: "#F2F0FD",
    blue1: "#1EA4CE",
    blue2: "#147594",
    gray1: "#525252",
    gray2: "#E0E0E0",
    gray3: "#697488",
    black: "#191919"
  }
  const Theme = {
    color: {
      white: "#fff",
    },
    desktop: {
      containerSize: "80%"
    },
    mobile: {
      containerSize: "98%"
    },
    palette: {
      primary: {
        main: colors.blue1,
        light: colors.white1,
        hover: colors.gray2,
        active: colors.gray3,
        activeTextColor: colors.white,
        text: colors.white,
      },
      secondary: {
        main: colors.white1,
        light: colors.white1,
        hover: colors.gray2,
        active: colors.gray1,
        activeTextColor: colors.white,
        text: colors.black,
      },
      transparent: {
        main: "transparent",
        light: colors.white1,
        hover: colors.gray2,
        active: colors.gray1,
        activeTextColor: colors.white,
        text: colors.blue1,
      },
      accent: {
        main: colors.blue2,
        light: colors.white1,
        hover: colors.gray2,
        active: colors.gray1,
        activeTextColor: colors.white,
      },
     
      attention: {
        main: "#db471e",
        light: "#F04A4A",
        dark: "#BD3A3A",
      },
      disabled: colors.gray3,
      border: { main: colors.gray2 },
      background: {
        body: "#FAFAFA",
      },
      text: {
        primary: colors.black,
        secondary: "#697488",
        tertiary: "#6F6F6F",
        label: "#525252",
        placeholder: colors.gray2
      },
    },
    input: {
      main: {
        border: `2px solid ${colors.gray2}`,
        height: "48px",
        backgroundColor: 'white'
      }
    },
    spacing: (multiplier = 1) => `${4 * multiplier}px`,
    formItemSpace: "18px",
    borderRadius: "2px",
    shadow: {
      elevation1: { "box-shadow": "0px 6px 24px rgba(93, 62, 188, 0.04)" },
      elevation3: { "box-shadow": "0px 6px 24px rgba(93, 62, 188, 0.50)" },
    },
    transition1: 'transition: all 0.2s ease;',
  
    typography: {
      label: {
        "font-size": "14px",
        "line-height": "20px",
        "color": colors.gray1,
        "user-select": "none"
      },
      h1: {
        "font-weight": "bold",
        "font-size": "68px",
      },
      h2: {
        "font-weight": "bold",
        "font-size": "50px",
      },
      h3: {
        "font-weight": "bold",
        "font-size": "38px",
      },
      h4: {
        "font-weight": "bold",
        "font-size": "28px",
      },
      h5: {
        "font-weight": "bold",
        "font-size": "22px",
      },
      h6: {
        "font-weight": "bold",
        "font-size": "16px",
      },
      body: {
        "font-weight": "normal",
        "font-size": "14px",
      },
      footer: {
        "font-weight": "normal",
        "font-size": "13px",
      },
      button: {
        "font-weight": "bold",
        "font-size": "14px",
        "text-transform": "uppercase",
      },
    },
  };
  
  export default Theme;