import chronoblogTheme from 'gatsby-theme-chronoblog/src/gatsby-plugin-theme-ui';

export default {
  ...chronoblogTheme,
  slimContainer: {
    px: [2, 3],
    py: 3,
    maxWidth: 768,
    mx: 'auto'
  },
  initialColorMode: 'dark',
  colors: {
    ...chronoblogTheme.color,
    text: '#222',
    background: '#f9dbbd',
    link: '#3d7e9a',
    primary: '#9a348e',
    secondary: '#84a9c0',
    muted: '#b3cbb9',
    modes: {
      ...chronoblogTheme.colors.modes,
      dark: {
        ...chronoblogTheme.colors.modes.dark,
        text: '#f9dbbd',
        background: '#0e0f17',
        muted: '#4a4063'
      }
    }
  },
  fontSizes: [14, 16, 18, 20, 22, 24, 28, 36],
  borderRadius: {
    ...chronoblogTheme.borderRadius,
    card: 12,
    button: 12,
    search: 12,
    code: 12,
    img: 12,
    authorBanner: 12
  },
  borderWidth: {
    ...chronoblogTheme.borderWidth,
    card: 2,
    search: 2
  },
  fonts: {
    ...chronoblogTheme.fonts,
    body: '-apple-system,BlinkMacSystemFont,Helvetica,Arial,sans-serif',
    heading: 'inherit',
    monospace: 'Menlo, monospace'
  }
};
