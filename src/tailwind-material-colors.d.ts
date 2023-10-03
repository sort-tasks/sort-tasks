declare module 'tailwind-material-colors' {
  import { Config as TailwindConfig } from 'tailwindcss';

  interface ColorsMap {
    primary: string;
    secondary?: string;
    tertiary?: string;
    // Add more color types as needed
  }

  interface Options {
    extend: boolean;
  }

  export const withMaterialColors: (config: TailwindConfig, colorsMap: ColorsMap, options?: Options) => TailwindConfig;
}
