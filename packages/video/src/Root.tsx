import React from 'react';
import { Composition, Folder } from 'remotion';
import { ComponentDemo, type ComponentDemoProps } from './ComponentDemo';

const FPS = 30;
const DURATION = 360; // 12 seconds (5 scenes × 72 frames)
const WIDTH = 1080;
const HEIGHT = 720;

const THEMES = ['product-a', 'product-b', 'product-c'] as const;
const LOCALES = ['en', 'ja', 'zh-TW'] as const;
const THEME_LABELS = { 'product-a': 'A', 'product-b': 'B', 'product-c': 'C' } as const;

export const RemotionRoot: React.FC = () => {
  return (
    <Folder name="Themes">
      {THEMES.map((theme) =>
        LOCALES.map((locale) => (
          <Composition
            key={`${theme}-${locale}`}
            id={`ComponentDemo-${THEME_LABELS[theme]}-${locale}`}
            component={ComponentDemo}
            durationInFrames={DURATION}
            fps={FPS}
            width={WIDTH}
            height={HEIGHT}
            defaultProps={{ theme, locale } satisfies ComponentDemoProps}
          />
        )),
      )}
    </Folder>
  );
};
