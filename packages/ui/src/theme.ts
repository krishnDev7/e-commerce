import { extendTheme, ThemeConfig, ThemeOverride } from '@chakra-ui/react';

const config: ThemeConfig = {
  initialColorMode: 'light',
  useSystemColorMode: false,
};

const colors: ThemeOverride['colors'] = {
  brand: {
    50: '#fef7ee',
    100: '#feead5',
    200: '#fcd2aa',
    300: '#f9b474',
    400: '#f5823c',
    500: '#f2571e',
    600: '#e4470c',
    700: '#bd360c',
    800: '#972c11',
    900: '#7a2611',
  },
  accent: {
    50: '#eef2ff',
    100: '#e0e7ff',
    200: '#c7d2fe',
    300: '#a5b4fc',
    400: '#818cf8',
    500: '#6366f1',
    600: '#4f46e5',
    700: '#4338ca',
    800: '#3730a3',
    900: '#312e81',
  },
  secondary: {
    50: '#f8fafc',
    100: '#f1f5f9',
    200: '#e2e8f0',
    300: '#cbd5e1',
    400: '#94a3b8',
    500: '#64748b',
    600: '#475569',
    700: '#334155',
    800: '#1e293b',
    900: '#0f172a',
  },
  success: {
    50: '#f0fdf4',
    100: '#dcfce7',
    200: '#bbf7d0',
    300: '#86efac',
    400: '#4ade80',
    500: '#22c55e',
    600: '#16a34a',
    700: '#15803d',
    800: '#166534',
    900: '#14532d',
  },
  warning: {
    50: '#fffbeb',
    100: '#fef3c7',
    200: '#fde68a',
    300: '#fcd34d',
    400: '#fbbf24',
    500: '#f59e0b',
    600: '#d97706',
    700: '#b45309',
    800: '#92400e',
    900: '#78350f',
  },
  error: {
    50: '#fef2f2',
    100: '#fee2e2',
    200: '#fecaca',
    300: '#fca5a5',
    400: '#f87171',
    500: '#ef4444',
    600: '#dc2626',
    700: '#b91c1c',
    800: '#991b1b',
    900: '#7f1d1d',
  },
};

const fonts = {
  heading: 'Inter, system-ui, sans-serif',
  body: 'Inter, system-ui, sans-serif',
};

const components = {
  Button: {
    baseStyle: {
      fontWeight: 'semibold',
      borderRadius: 'lg',
    },
    variants: {
      solid: {
        bg: 'brand.500',
        color: 'white',
        _hover: {
          bg: 'brand.600',
          transform: 'translateY(-1px)',
          boxShadow: 'lg',
        },
        _active: {
          bg: 'brand.700',
          transform: 'translateY(0)',
        },
      },
      outline: {
        borderColor: 'brand.500',
        color: 'brand.500',
        _hover: {
          bg: 'brand.50',
          transform: 'translateY(-1px)',
          boxShadow: 'lg',
        },
      },
      ghost: {
        color: 'brand.500',
        _hover: {
          bg: 'brand.50',
        },
      },
    },
  },
  Card: {
    baseStyle: {
      container: {
        borderRadius: 'xl',
        boxShadow: 'sm',
        _hover: {
          boxShadow: 'md',
          transform: 'translateY(-2px)',
        },
        transition: 'all 0.2s ease-in-out',
      },
    },
  },
  Input: {
    variants: {
      outline: {
        field: {
          borderColor: 'secondary.300',
          _hover: {
            borderColor: 'brand.300',
          },
          _focus: {
            borderColor: 'brand.500',
            boxShadow: '0 0 0 1px var(--chakra-colors-brand-500)',
          },
        },
      },
    },
  },
};

// Factory to avoid executing extendTheme during RSC import chains. Call in a client boundary.
export const createTheme = () =>
  extendTheme({
    config,
    colors,
    fonts,
    components,
    styles: {
      global: {
        body: {
          bg: 'gray.50',
          color: 'secondary.800',
        },
      },
    },
  });
