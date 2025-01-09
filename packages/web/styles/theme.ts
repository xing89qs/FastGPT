import { extendTheme, defineStyleConfig, ComponentStyleConfig } from '@chakra-ui/react';
import {
  modalAnatomy,
  switchAnatomy,
  selectAnatomy,
  numberInputAnatomy,
  checkboxAnatomy,
  tableAnatomy,
  radioAnatomy
} from '@chakra-ui/anatomy';
import { color, createMultiStyleConfigHelpers, defineStyle } from '@chakra-ui/styled-system';

const { definePartsStyle: modalPart, defineMultiStyleConfig: modalMultiStyle } =
  createMultiStyleConfigHelpers(modalAnatomy.keys);
const { definePartsStyle: switchPart, defineMultiStyleConfig: switchMultiStyle } =
  createMultiStyleConfigHelpers(switchAnatomy.keys);
const { definePartsStyle: selectPart, defineMultiStyleConfig: selectMultiStyle } =
  createMultiStyleConfigHelpers(selectAnatomy.keys);
const { definePartsStyle: numInputPart, defineMultiStyleConfig: numInputMultiStyle } =
  createMultiStyleConfigHelpers(numberInputAnatomy.keys);
const { definePartsStyle: checkBoxPart, defineMultiStyleConfig: checkBoxMultiStyle } =
  createMultiStyleConfigHelpers(checkboxAnatomy.keys);
const { definePartsStyle: tablePart, defineMultiStyleConfig: tableMultiStyle } =
  createMultiStyleConfigHelpers(tableAnatomy.keys);
const { definePartsStyle: radioParts, defineMultiStyleConfig: radioStyle } =
  createMultiStyleConfigHelpers(radioAnatomy.keys);

const shadowLight = '0px 0px 0px 2.4px rgba(51, 112, 255, 0.15)';

// 按键
const Button = defineStyleConfig({
  baseStyle: {
    _active: {
      transform: 'scale(0.98)'
    },
    _disabled: {
      transform: 'none !important',
      _hover: {
        filter: 'none'
      }
    }
  },
  sizes: {
    xs: {
      fontSize: 'xs',
      px: '2',
      py: '0',
      h: '24px',
      minH: '24px',
      fontWeight: 'medium',
      borderRadius: 'sm'
    },
    xsSquare: {
      fontSize: 'xs',
      px: '0',
      py: '0',
      h: '24px',
      minH: '24px',
      w: '24px',
      fontWeight: 'medium',
      borderRadius: 'sm'
    },
    sm: {
      fontSize: 'sm',
      px: '3',
      py: 0,
      fontWeight: 'medium',
      h: '30px',
      minH: '30px',
      borderRadius: 'sm'
    },
    smSquare: {
      fontSize: 'sm',
      px: '0',
      py: 0,
      fontWeight: 'medium',
      h: '30px',
      minH: '30px',
      w: '30px',
      borderRadius: 'sm'
    },
    md: {
      fontSize: 'sm',
      px: '4',
      py: 0,
      h: '34px',
      minH: '34px',
      fontWeight: 'medium',
      borderRadius: 'sm'
    },
    mdSquare: {
      fontSize: 'sm',
      px: '0',
      py: 0,
      h: '34px',
      minH: '34px',
      w: '34px',
      fontWeight: 'medium',
      borderRadius: 'sm'
    },
    lg: {
      fontSize: 'md',
      px: '4',
      py: 0,
      h: '40px',
      minH: '40px',
      fontWeight: 'medium',
      borderRadius: 'md'
    },
    lgSquare: {
      fontSize: 'md',
      px: '0',
      py: 0,
      h: '40px',
      minH: '40px',
      w: '40px',
      fontWeight: 'medium',
      borderRadius: 'md'
    }
  },
  variants: {
    primary: {
      bg: 'primary.600',
      color: 'white',
      border: 'none',
      boxShadow: '0px 0px 1px 0px rgba(0, 0, 0, 0.25), 0px 1px 2px 0px rgba(0, 0, 0, 0.2)',
      _hover: {
        filter: 'brightness(120%)'
      },
      _disabled: {
        bg: 'gray.600 !important',
        _dark: {
          bg: 'gray.700 !important'
        }
      },
      _dark: {
        bg: 'primary.500',
        boxShadow:
          '0px 0px 1px 0px rgba(255, 255, 255, 0.25), 0px 1px 2px 0px rgba(255, 255, 255, 0.2)'
      }
    },
    primaryOutline: {
      color: 'primary.300',
      border: '1px solid',
      borderColor: 'primary.600',
      bg: 'gray.100',
      transition: 'background 0.1s',
      boxShadow: '1',
      _hover: {
        bg: 'gray.200'
      },
      _active: {
        color: 'primary.300'
      },
      _disabled: {
        bg: 'gray.100 !important',
        _dark: {
          bg: 'gray.700 !important'
        }
      },
      _dark: {
        color: 'primary.200',
        borderColor: 'primary.400',
        bg: 'gray.700',
        _hover: {
          bg: 'gray.600'
        }
      }
    },
    primaryGhost: {
      color: 'primary.300',
      border: '1px solid',
      borderColor: 'primary.600',
      bg: 'gray.100',
      transition: 'background 0.1s',
      boxShadow: '1',
      _hover: {
        bg: 'primary.600',
        color: 'white',
        borderColor: 'primary.600'
      },
      _disabled: {
        color: 'primary.300 !important',
        bg: 'gray.100 !important',
        borderColor: 'primary.600 !important',
        _dark: {
          color: 'primary.200 !important',
          bg: 'gray.700 !important',
          borderColor: 'primary.400 !important'
        }
      },
      _dark: {
        color: 'primary.200',
        borderColor: 'primary.400',
        bg: 'gray.700',
        _hover: {
          bg: 'primary.500',
          color: 'white',
          borderColor: 'primary.400'
        }
      }
    },
    whiteBase: {
      color: 'myGray.900',
      border: '1px solid',
      borderColor: 'myGray.300',
      bg: 'myGray.50',
      transition: 'background 0.1s',
      boxShadow: '0px 0px 1px 0px rgba(0, 0, 0, 0.25), 0px 1px 2px 0px rgba(0, 0, 0, 0.2)',
      _hover: {
        color: 'primary.600'
      },
      _active: {
        color: 'primary.600'
      },
      _disabled: {
        color: 'myGray.900 !important'
      }
    },
    whitePrimaryOutline: {
      border: '1px solid',
      borderColor: 'gray.200',
      bg: 'gray.800',
      color: 'gray.100',
      transition: 'background 0.1s',
      _hover: {
        color: 'primary.600',
        borderColor: 'gray.100'
      }
    },
    whitePrimary: {
      color: 'myGray.900',
      border: '1px solid',
      borderColor: 'myGray.300',
      bg: 'myGray.50',
      transition: 'background 0.1s',
      boxShadow: '0px 0px 1px 0px rgba(0, 0, 0, 0.25), 0px 1px 2px 0px rgba(0, 0, 0, 0.2)',
      _hover: {
        color: 'primary.600',
        background: 'myGray.100',
        borderColor: 'primary.300'
      },
      _active: {
        color: 'primary.600'
      },
      _disabled: {
        color: 'myGray.900 !important'
      }
    },
    whiteDanger: {
      color: 'myGray.900',
      border: '1px solid',
      borderColor: 'myGray.300',
      bg: 'myGray.50',
      transition: 'background 0.1s',
      boxShadow: '0px 0px 1px 0px rgba(0, 0, 0, 0.25), 0px 1px 2px 0px rgba(0, 0, 0, 0.2)',
      _hover: {
        color: 'red.600',
        borderColor: 'red.300'
      },
      _active: {
        color: 'red.600'
      }
    },
    grayBase: {
      bg: 'myGray.200',
      color: 'myGray.700',
      transition: 'background 0.1s',
      _hover: {
        color: 'primary.500',
        bg: 'myGray.300'
      },
      _active: {
        bg: 'myGray.300'
      },
      _disabled: {
        opacity: 0.4,
        bg: 'myGray.100 !important',
        cursor: 'not-allowed'
      }
    },
    grayDanger: {
      bg: 'gray.200',
      color: 'gray.50',
      _hover: {
        color: 'red.300',
        background: 'red.900',
        borderColor: 'red.600'
      },
      _active: {
        color: 'red.300'
      }
    },
    grayGhost: {
      color: 'gray.400',
      fontWeight: '500',
      p: 0,
      bg: 'transparent',
      transition: 'background 0.1s',
      _hover: {
        bg: 'gray.200'
      }
    },
    transparentBase: {
      color: 'gray.100',
      fontWeight: '500',
      bg: 'transparent',
      transition: 'background 0.1s',
      _hover: {
        bg: 'gray.200'
      },
      _active: {
        bg: 'gray.200'
      },
      _disabled: {
        color: 'gray.100 !important'
      }
    },
    transparentDanger: {
      color: 'gray.100',
      fontWeight: '500',
      bg: 'transparent',
      transition: 'background 0.1s',
      _hover: {
        bg: 'gray.200',
        color: 'red.300'
      },
      _active: {
        bg: 'gray.200'
      },
      _disabled: {
        color: 'gray.100 !important'
      }
    },
    dangerFill: {
      bg: 'red.600',
      color: 'white',
      border: 'none',
      boxShadow: '0px 0px 1px 0px rgba(0, 0, 0, 0.25), 0px 1px 2px 0px rgba(0, 0, 0, 0.2)',
      _hover: {
        filter: 'brightness(120%)'
      },
      _disabled: {
        bg: 'red.800 !important'
      }
    }
  },
  defaultProps: {
    size: 'md',
    variant: 'primary'
  }
});

const Input: ComponentStyleConfig = {
  sizes: {
    sm: defineStyle({
      field: {
        h: '32px',
        borderRadius: 'sm'
      }
    }),
    md: defineStyle({
      field: {
        h: '36px',
        borderRadius: 'sm'
      }
    }),
    lg: defineStyle({
      field: {
        h: '40px',
        borderRadius: 'md'
      }
    })
  },
  variants: {
    outline: {
      field: {
        border: '1px solid',
        borderColor: 'gray.300',
        px: 3,
        bg: 'gray.50',
        color: 'gray.900',
        _focus: {
          borderColor: 'primary.300',
          boxShadow: shadowLight,
          bg: 'gray.100'
        },
        _hover: {
          borderColor: 'primary.300'
        },
        _disabled: {
          color: 'gray.700',
          bg: 'gray.100'
        },
        _placeholder: {
          color: 'gray.500'
        }
      }
    }
  },
  defaultProps: {
    size: 'md',
    variant: 'outline'
  }
};

const NumberInput = numInputMultiStyle({
  sizes: {
    sm: defineStyle({
      field: {
        h: '32px',
        borderRadius: 'sm',
        fontsize: 'sm'
      }
    }),
    lg: defineStyle({
      field: {
        h: '40px',
        borderRadius: 'sm',
        fontsize: 'sm'
      }
    })
  },
  variants: {
    outline: numInputPart({
      field: {
        bg: 'gray.50',
        border: '1px solid',
        borderColor: 'gray.300',
        color: 'gray.900',
        _focus: {
          borderColor: 'primary.300 !important',
          boxShadow: `${shadowLight} !important`,
          bg: 'gray.100'
        },
        _disabled: {
          color: 'gray.700 !important',
          bg: 'gray.100 !important'
        }
      },
      stepper: {
        bg: 'transparent',
        color: 'gray.600',
        _active: {
          color: 'primary.600'
        },
        _hover: {
          bg: 'gray.100'
        }
      }
    })
  },
  defaultProps: {
    variant: 'outline'
  }
});

const Textarea: ComponentStyleConfig = {
  variants: {
    outline: {
      border: '1px solid',
      px: 3,
      borderRadius: 'md',
      borderColor: 'gray.600',
      bg: 'gray.100',
      color: 'gray.900',
      fontSize: 'sm',
      _hover: {
        borderColor: 'primary.600'
      },
      _focus: {
        borderColor: 'primary.500',
        boxShadow: shadowLight,
        bg: 'gray.200'
      },
      _placeholder: {
        color: 'gray.600'
      }
    }
  },
  defaultProps: {
    size: 'md',
    variant: 'outline'
  }
};

const Switch = switchMultiStyle({
  baseStyle: switchPart({
    track: {
      bg: 'gray.200',
      borderWidth: '1px',
      borderColor: 'gray.600',
      _checked: {
        bg: 'primary.600'
      }
    }
  }),
  defaultProps: {
    size: 'md'
  }
});

const Select = selectMultiStyle({
  variants: {
    outline: selectPart({
      field: {
        borderColor: 'gray.600',
        bg: 'gray.100',
        color: 'gray.900',
        _focusWithin: {
          boxShadow: shadowLight,
          borderColor: 'primary.500'
        }
      }
    })
  }
});

const Radio = radioStyle({
  baseStyle: radioParts({
    control: {
      _hover: {
        borderColor: 'primary.600',
        bg: 'gray.200'
      },
      _checked: {
        borderColor: 'primary.600',
        bg: 'gray.200',
        boxShadow: shadowLight,
        _before: {
          bg: 'primary.600'
        },
        _hover: {
          bg: 'gray.200'
        }
      }
    }
  })
});

const Checkbox = checkBoxMultiStyle({
  baseStyle: checkBoxPart({
    label: {
      fontFamily: 'mono',
      _disabled: {
        outline: 'none'
      }
    },
    control: {
      borderRadius: 'xs',
      bg: 'none',
      _checked: {
        bg: 'gray.200',
        borderColor: 'primary.600',
        borderWidth: '1px',
        color: 'primary.600',
        boxShadow: `${shadowLight} !important`,
        _hover: {
          bg: 'gray.200'
        },
        _disabled: {
          bg: 'gray.200',
          borderColor: 'transparent',
          color: 'gray.500',
          outline: 'none'
        }
      },
      _hover: {
        borderColor: 'primary.500'
      }
    }
  })
});

const Modal = modalMultiStyle({
  sizes: {
    md: modalPart({
      body: {
        py: 4,
        px: 7
      },
      footer: {
        pt: 2
      }
    }),
    lg: modalPart({
      body: {
        pt: 8,
        pb: 6,
        px: '3.25rem'
      },
      footer: {
        pb: 8,
        px: '3.25rem',
        pt: 0
      }
    })
  }
});

const Table = tableMultiStyle({
  sizes: {
    md: defineStyle({
      table: {
        fontsize: 'sm'
      },
      thead: {
        tr: {
          bg: 'gray.200',
          fontSize: 'sm',
          th: {
            borderBottom: 'none',
            overflow: 'hidden',
            '&:first-of-type': {
              borderLeftRadius: 'md'
            },
            '&:last-of-type': {
              borderRightRadius: 'md'
            }
          }
        }
      },
      tbody: {
        tr: {
          td: {
            overflow: 'hidden',
            '&:first-of-type': {
              borderLeftRadius: 'md'
            },
            '&:last-of-type': {
              borderRightRadius: 'md'
            }
          }
        }
      }
    })
  },
  variants: {
    workflow: {
      table: {
        bg: 'gray.100'
      },
      thead: {
        tr: {
          th: {
            p: '0',
            px: 4,
            bg: 'gray.200',
            borderRadius: 'none !important',
            borderBottom: 'none',
            height: '32px',
            fontSize: 'mini',
            fontWeight: 'medium',
            color: 'gray.900'
          }
        }
      },
      tbody: {
        tr: {
          td: {
            p: '0',
            px: 4,
            fontSize: 'xs',
            borderBottom: 'base',
            height: '40px',
            color: 'gray.900'
          },
          '&:last-child': {
            td: {
              borderBottom: 'none'
            }
          }
        }
      }
    }
  },
  defaultProps: {
    size: 'md'
  }
});

const config = {
  initialColorMode: 'dark',
  useSystemColorMode: false
};
const colors = {
  primary: {
    50: '#E6E8FF',
    100: '#C5CAFF',
    200: '#A4ABFF',
    300: '#838DFF',
    400: '#626EFF',
    500: '#4150FF',
    600: '#3440CC',
    700: '#273099',
    800: '#1A2066',
    900: '#0D1033'
  },
  gray: {
    50: '#1C2128',
    100: '#22272E',
    200: '#2D333B',
    300: '#373E47',
    400: '#444C56',
    500: '#545D68',
    600: '#768390',
    700: '#909DAB',
    800: '#ADBAC7',
    900: '#CDD9E5'
  },
  borders: {
    base: '1px solid var(--chakra-colors-gray-200)'
  },
  background: {
    primary: '#0D1117',
    secondary: '#161B22',
    tertiary: '#22272E'
  },
  text: {
    primary: '#CDD9E5',
    secondary: '#768390',
    accent: '#539BF5'
  }
};

// 全局主题
export const theme = extendTheme({
  config,
  styles: {
    global: {
      'html, body': {
        color: 'gray.900',
        fontWeight: 'normal',
        height: '100%',
        overflow: 'hidden',
        fontSize: '16px',
        bg: 'gray.50'
      },
      body: {
        bg: 'gray.50',
        color: 'gray.900'
      },
      a: {
        color: 'primary.600'
      },

      '*': {
        _focusVisible: {
          boxShadow: 'none'
        }
      }
    }
  },
  colors: {
    myWhite: {
      100: '#1A1D21',
      200: '#1E2227',
      300: '#22272E',
      400: '#2D333B',
      500: '#373E47',
      600: '#444C56',
      700: '#545D68',
      800: '#636E7B',
      900: '#768390',
      1000: '#8B96A4'
    },
    myGray: {
      '05': 'rgba(205, 217, 229, 0.05)',
      1: 'rgba(205, 217, 229, 0.1)',
      15: 'rgba(205, 217, 229, 0.15)',

      25: '#1A1D21',
      50: '#22272E',
      100: '#2D333B',
      150: '#373E47',
      200: '#444C56',
      250: '#545D68',
      300: '#636E7B',
      400: '#768390',
      500: '#8B96A4',
      600: '#A1ACB8',
      700: '#B7C2CD',
      800: '#CDD9E5',
      900: '#E4EBF0'
    },
    primary: {
      1: 'rgba(88, 166, 255, 0.1)',
      '015': 'rgba(88, 166, 255, 0.15)',
      3: 'rgba(88, 166, 255, 0.3)',
      5: 'rgba(88, 166, 255, 0.5)',
      7: 'rgba(88, 166, 255, 0.7)',
      9: 'rgba(88, 166, 255, 0.9)',

      50: '#0D1117',
      100: '#161B22',
      200: '#21262D',
      300: '#30363D',
      400: '#2F81F7',
      500: '#4184E4',
      600: '#58A6FF',
      700: '#79B8FF',
      800: '#9ECBFF',
      900: '#C9E3FF'
    },
    blue: {
      1: 'rgba(88, 166, 255, 0.1)',
      '015': 'rgba(88, 166, 255, 0.15)',
      3: 'rgba(88, 166, 255, 0.3)',
      5: 'rgba(88, 166, 255, 0.5)',
      7: 'rgba(88, 166, 255, 0.7)',
      9: 'rgba(88, 166, 255, 0.9)',

      50: '#0D1117',
      100: '#161B22',
      200: '#21262D',
      300: '#30363D',
      400: '#2F81F7',
      500: '#4184E4',
      600: '#58A6FF',
      700: '#79B8FF',
      800: '#9ECBFF',
      900: '#C9E3FF'
    },
    red: {
      1: 'rgba(248, 81, 73, 0.1)',
      3: 'rgba(248, 81, 73, 0.3)',
      5: 'rgba(248, 81, 73, 0.5)',

      25: '#1C1717',
      50: '#2D2121',
      100: '#3D2B2B',
      200: '#4E3636',
      300: '#FA4B4B',
      400: '#F85149',
      500: '#F04438',
      600: '#E5534B',
      700: '#D95D55',
      800: '#CC6B6B',
      900: '#BF7A7A'
    },
    green: {
      25: '#161B16',
      50: '#1B211B',
      100: '#238636',
      200: '#2EA043',
      300: '#3FB950',
      400: '#56D364',
      500: '#6FDD8B',
      600: '#88E596',
      700: '#A1EDB0',
      800: '#BAF5CA',
      900: '#D3FCE4'
    },
    yellow: {
      25: '#1C1A16',
      50: '#2B2516',
      100: '#3B3016',
      200: '#D29922',
      300: '#E3B341',
      400: '#F6C146',
      500: '#FFCA5A',
      600: '#FFD571',
      700: '#FFE188',
      800: '#FFECA0',
      900: '#FFF6B7'
    },
    adora: {
      25: '#17171F',
      50: '#1E1E2C',
      100: '#252539',
      200: '#2C2C46',
      300: '#8B7FE6',
      400: '#9D93E9',
      500: '#AFA7EC',
      600: '#C1BBEF',
      700: '#D3CFF2',
      800: '#E5E3F5',
      900: '#F7F7F8'
    },
    borderColor: {
      low: '#30363D',
      base: '#373E47',
      high: '#444C56',
      highest: '#545D68'
    }
  },
  fonts: {
    body: 'PingFang,Noto Sans,-apple-system,BlinkMacSystemFont,"Segoe UI",Helvetica,Arial,sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol"'
  },
  fontSizes: {
    mini: '0.75rem',
    xs: '0.8rem',
    sm: '0.875rem',
    md: '1rem',
    lg: '1.25rem',
    xl: '1.5rem',
    '2xl': '1.75rem',
    '3xl': '2rem',
    '4xl': '2.25rem',
    '5xl': '2.8rem',
    '6xl': '3.6rem'
  },
  borders: {
    sm: '1px solid #30363D',
    base: '1px solid #373E47',
    md: '1px solid #444C56',
    lg: '1px solid #545D68'
  },
  radii: {
    none: '0',
    xs: '0.25rem',
    sm: '0.375rem',
    md: '0.5rem',
    semilg: '0.625rem',
    lg: '0.75rem',
    xl: '1rem'
  },
  shadows: {
    1: '0px 1px 2px 0px rgba(0, 0, 0, 0.25), 0px 0px 1px 0px rgba(0, 0, 0, 0.30)',
    1.5: '0px 1px 2px 0px rgba(0, 0, 0, 0.30), 0px 0px 1px 0px rgba(0, 0, 0, 0.35)',
    2: '0px 4px 4px 0px rgba(0, 0, 0, 0.25), 0px 0px 1px 0px rgba(0, 0, 0, 0.30)',
    3: '0px 4px 10px 0px rgba(0, 0, 0, 0.30), 0px 0px 1px 0px rgba(0, 0, 0, 0.30)',
    3.5: '0px 4px 10px 0px rgba(0, 0, 0, 0.35), 0px 0px 1px 0px rgba(0, 0, 0, 0.35)',
    4: '0px 12px 16px -4px rgba(0, 0, 0, 0.40), 0px 0px 1px 0px rgba(0, 0, 0, 0.40)',
    5: '0px 20px 24px -8px rgba(0, 0, 0, 0.35), 0px 0px 1px 0px rgba(0, 0, 0, 0.35)',
    6: '0px 24px 48px -12px rgba(0, 0, 0, 0.40), 0px 0px 1px 0px rgba(0, 0, 0, 0.40)',
    7: '0px 32px 64px -12px rgba(0, 0, 0, 0.40), 0px 0px 1px 0px rgba(0, 0, 0, 0.40)',
    focus: shadowLight,
    outline: 'none'
  },
  breakpoints: {
    sm: '900px',
    md: '1200px',
    lg: '1500px',
    xl: '1800px',
    '2xl': '2100px'
  },
  lgColor: {
    activeBlueGradient: 'linear-gradient(to bottom right, #1C2128 0%, #22272E 100%)',
    hoverBlueGradient: 'linear-gradient(to top left, #1C2128 0%, #22272E 100%)',
    primary: 'linear-gradient(to bottom right, #273099 0%, #4150FF 40%, #626EFF 100%)',
    primary2: 'linear-gradient(to bottom right, #273099 0%, #4150FF 30%, #626EFF 80%, #838DFF 100%)'
  },
  components: {
    Button,
    Input,
    Textarea,
    Switch,
    Select,
    NumberInput,
    Checkbox,
    Modal,
    Table,
    Radio
  }
});
