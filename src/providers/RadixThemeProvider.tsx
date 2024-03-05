'use client'

import '@radix-ui/themes/styles.css';
import { Theme } from '@radix-ui/themes';

interface RadixThemeProviderProps {
    children: React.ReactNode | React.ReactNode[];
  }

export default function RadixThemeProvider({ children, ...props }: RadixThemeProviderProps) {
  return (
    <Theme appearance="light" accentColor="violet" grayColor="gray" radius="full" {...props}>
      {children}
    </Theme>
  );
}