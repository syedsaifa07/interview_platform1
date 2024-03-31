import { extendTheme } from '@chakra-ui/react'

const config = {
  initialColorMode: 'dark',
  useSystemColorMode: false,
}

const styles = {
  global: {
    body: {
      bg: 'black', // Set your desired background color here
    },
  },
}

const theme = extendTheme({ config, styles })

export default theme