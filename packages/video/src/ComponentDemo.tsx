import React from 'react';
import {
  AbsoluteFill,
  Easing,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from 'remotion';
import { type ThemeName, type ThemeTokens, themes, fonts } from './tokens';

/* ================================================================
   COMPONENT DEMO v2 — Full-screen showcase with circle character
   ================================================================
   12 seconds · 360 frames @ 30fps · 1080×720

   Inspired by "Taipei See The Change" (Bito Studio):
   - A circle acts as the leading character, guiding transitions
   - Each scene showcases ONE component type, large and centered
   - Circle-wipe reveals transition between scenes
   - Background colors rotate through theme palette
   - Decorative geometry adds visual texture
   - Seamless loop
   ================================================================ */

const NUM_SCENES = 5;
const SCENE_FRAMES = 72;
const W = 1080;
const H = 720;

// ─── Scene configuration ────────────────────────────────────────

type SceneConfig = {
  bg: string;
  fg: string;
  fgSub: string;
  circleColor: string;
};

function getScenes(t: ThemeTokens): SceneConfig[] {
  return [
    // 0 — Button
    { bg: t.background, fg: t.fgPrimary, fgSub: t.fgSecondary, circleColor: t.brandPrimary },
    // 1 — Badge (inverted on brand)
    { bg: t.brandPrimary, fg: t.fgBrandOnPrimary, fgSub: t.fgBrandOnPrimary, circleColor: t.fgBrandOnPrimary },
    // 2 — Card
    { bg: t.backgroundSecondary, fg: t.fgPrimary, fgSub: t.fgSecondary, circleColor: t.brandPrimary },
    // 3 — Toggle
    { bg: t.brandSecondary, fg: t.fgBrandOnSecondary, fgSub: t.fgBrandOnSecondary, circleColor: t.brandPrimary },
    // 4 — Chip
    { bg: t.backgroundCard, fg: t.fgPrimary, fgSub: t.fgSecondary, circleColor: t.brandPrimary },
  ];
}

// ─── Locale support ──────────────────────────────────────────────

export type LocaleName = 'en' | 'ja' | 'zh-TW';

type VideoText = {
  buttons: string[];
  badges: string[];
  cardTitle: string;
  cardBody: string;
  toggleOn: string;
  toggleOff: string;
  chips: string[];
};

const TEXT: Record<LocaleName, VideoText> = {
  en: {
    buttons: ['Get started', 'Learn more', 'Cancel', 'Delete'],
    badges: ['Success', 'Danger', 'Warning', 'Promote', 'Neutral'],
    cardTitle: 'Accessible Design',
    cardBody: 'WCAG compliant with ARIA labels, keyboard navigation, and semantic HTML.',
    toggleOn: 'True',
    toggleOff: 'False',
    chips: ['Team player', 'System thinker', 'Pixel pusher'],
  },
  ja: {
    buttons: ['はじめる', 'もっと見る', 'キャンセル', '削除'],
    badges: ['成功', '危険', '警告', 'プロモート', 'ニュートラル'],
    cardTitle: 'アクセシブルデザイン',
    cardBody: 'ARIAラベル、キーボード操作、セマンティックHTMLに対応したWCAG準拠設計。',
    toggleOn: 'オン',
    toggleOff: 'オフ',
    chips: ['チームプレイヤー', 'システム思考家', 'ピクセル職人'],
  },
  'zh-TW': {
    buttons: ['立即開始', '了解更多', '取消', '刪除'],
    badges: ['成功', '危險', '警告', '推薦', '中性'],
    cardTitle: '無障礙設計',
    cardBody: '符合 WCAG 標準，支援 ARIA 標籤、鍵盤導航與語意化 HTML。',
    toggleOn: '開啟',
    toggleOff: '關閉',
    chips: ['團隊合作者', '系統思考者', '像素工匠'],
  },
};

// ─── Circle keyframes ───────────────────────────────────────────
// Each scene: enter → rest → exit.  Exit of scene N = enter of scene N+1.
// Rest positions are pushed to edges/corners so the circle doesn't
// compete with the centered component showcase.

type V2 = { x: number; y: number };

const CK: { enter: V2; rest: V2; exit: V2 }[] = [
  { enter: { x: 540, y: 360 }, rest: { x: 80, y: 120 }, exit: { x: 980, y: 100 } },
  { enter: { x: 980, y: 100 }, rest: { x: 950, y: 620 }, exit: { x: 80, y: 600 } },
  { enter: { x: 80, y: 600 }, rest: { x: 100, y: 100 }, exit: { x: 960, y: 80 } },
  { enter: { x: 960, y: 80 }, rest: { x: 80, y: 620 }, exit: { x: 980, y: 600 } },
  { enter: { x: 980, y: 600 }, rest: { x: 960, y: 100 }, exit: { x: 540, y: 360 } }, // loop
];

function lerp(a: V2, b: V2, p: number): V2 {
  return { x: a.x + (b.x - a.x) * p, y: a.y + (b.y - a.y) * p };
}

function circlePos(sf: number, si: number): V2 {
  const k = CK[si];
  if (sf <= 12) {
    const p = interpolate(sf, [0, 12], [0, 1], {
      extrapolateRight: 'clamp',
      easing: Easing.out(Easing.cubic),
    });
    return lerp(k.enter, k.rest, p);
  }
  if (sf <= 50) return k.rest;
  const p = interpolate(sf, [50, 64], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.inOut(Easing.cubic),
  });
  return lerp(k.rest, k.exit, p);
}

// ─── Decorative dots per scene ──────────────────────────────────

type Dot = { x: number; y: number; size: number; delay: number };

const DOTS: Dot[][] = [
  [{ x: 920, y: 520, size: 8, delay: 14 }, { x: 80, y: 600, size: 6, delay: 18 }, { x: 700, y: 100, size: 10, delay: 16 }, { x: 960, y: 360, size: 5, delay: 20 }],
  [{ x: 150, y: 150, size: 9, delay: 12 }, { x: 900, y: 600, size: 7, delay: 20 }, { x: 400, y: 80, size: 8, delay: 15 }, { x: 700, y: 640, size: 6, delay: 18 }],
  [{ x: 200, y: 100, size: 10, delay: 14 }, { x: 850, y: 550, size: 6, delay: 18 }, { x: 500, y: 650, size: 8, delay: 12 }, { x: 100, y: 400, size: 5, delay: 22 }],
  [{ x: 100, y: 500, size: 7, delay: 16 }, { x: 800, y: 100, size: 9, delay: 13 }, { x: 950, y: 400, size: 6, delay: 19 }, { x: 300, y: 620, size: 8, delay: 15 }],
  [{ x: 200, y: 600, size: 8, delay: 15 }, { x: 700, y: 80, size: 10, delay: 12 }, { x: 900, y: 350, size: 7, delay: 17 }, { x: 150, y: 200, size: 6, delay: 20 }],
];

// ─── Fake UI components (showcase size) ─────────────────────────

const FakeButton: React.FC<{
  label: string;
  bg: string;
  fg: string;
  radius: number;
}> = ({ label, bg, fg, radius }) => (
  <div
    style={{
      backgroundColor: bg,
      color: fg,
      padding: '20px 56px',
      borderRadius: radius,
      fontSize: 26,
      fontWeight: 600,
      letterSpacing: -0.3,
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      whiteSpace: 'nowrap',
    }}
  >
    {label}
  </div>
);

const FakeBadge: React.FC<{
  label: string;
  bg: string;
  fg: string;
  radius: number;
}> = ({ label, bg, fg, radius }) => (
  <span
    style={{
      backgroundColor: bg,
      color: fg,
      padding: '10px 22px',
      borderRadius: radius,
      fontSize: 17,
      fontWeight: 600,
      textTransform: 'uppercase',
      letterSpacing: 1,
      whiteSpace: 'nowrap',
    }}
  >
    {label}
  </span>
);

const FakeCard: React.FC<{ t: ThemeTokens; sceneBg: string; title: string; body: string }> = ({ t, sceneBg, title, body }) => (
  <div
    style={{
      backgroundColor: t.backgroundCard === sceneBg ? t.background : t.backgroundCard,
      borderRadius: t.radiusCard,
      padding: 56,
      width: 720,
      display: 'flex',
      gap: 32,
      alignItems: 'flex-start',
      boxShadow: '0 8px 40px rgba(0,0,0,0.08)',
    }}
  >
    <div
      style={{
        width: 64,
        height: 64,
        borderRadius: t.radiusCard,
        backgroundColor: t.brandPrimary,
        flexShrink: 0,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: t.fgBrandOnPrimary,
        fontSize: 30,
        fontWeight: 700,
      }}
    >
      A
    </div>
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <div style={{ fontSize: 34, fontWeight: 600, color: t.fgPrimary, letterSpacing: -0.3 }}>
        {title}
      </div>
      <div style={{ fontSize: 21, color: t.fgSecondary, lineHeight: 1.55 }}>
        {body}
      </div>
    </div>
  </div>
);

const FakeToggle: React.FC<{
  t: ThemeTokens;
  fg: string;
  sf: number;
  fps: number;
  onLabel: string;
  offLabel: string;
}> = ({ t, fg, sf, fps, onLabel, offLabel }) => {
  const thumb = spring({ frame: sf, fps, delay: 22, config: { damping: 12 } });
  const thumbX = interpolate(thumb, [0, 1], [0, 36]);
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 24, transform: 'scale(2.4)', transformOrigin: 'center' }}>
      <div
        style={{
          width: 72,
          height: 38,
          borderRadius: 9999,
          backgroundColor: thumb > 0.5 ? t.toggleOn : t.toggleOff,
          position: 'relative',
        }}
      >
        <div
          style={{
            position: 'absolute',
            top: 3,
            left: 3,
            width: 32,
            height: 32,
            borderRadius: '50%',
            backgroundColor: t.toggleThumb,
            transform: `translateX(${thumbX}px)`,
            boxShadow: '0 2px 6px rgba(0,0,0,0.15)',
          }}
        />
      </div>
      <span style={{ fontSize: 13, fontWeight: 500, color: fg }}>
        {thumb > 0.5 ? onLabel : offLabel}
      </span>
    </div>
  );
};

const FakeChip: React.FC<{
  label: string;
  selected: boolean;
  t: ThemeTokens;
  fg: string;
}> = ({ label, selected, t, fg }) => (
  <div
    style={{
      backgroundColor: selected ? t.brandPrimary : 'transparent',
      color: selected ? t.fgBrandOnPrimary : fg,
      border: `2px solid ${selected ? t.brandPrimary : t.borderBrand}`,
      padding: '16px 40px',
      borderRadius: t.radiusButtonSmall,
      fontSize: 24,
      fontWeight: 600,
      display: 'inline-flex',
      alignItems: 'center',
      gap: 8,
      whiteSpace: 'nowrap',
    }}
  >
    {label}
  </div>
);

// ─── Main composition ───────────────────────────────────────────

export type ComponentDemoProps = { theme: ThemeName; locale: LocaleName };

export const ComponentDemo: React.FC<ComponentDemoProps> = ({ theme, locale }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const t = themes[theme];
  const txt = TEXT[locale];
  const scenes = getScenes(t);

  const si = Math.min(Math.floor(frame / SCENE_FRAMES), NUM_SCENES - 1);
  const sf = frame - si * SCENE_FRAMES;
  const sc = scenes[si];
  const nextSc = scenes[(si + 1) % NUM_SCENES];

  // ── Component visibility ──
  const compEnter = spring({ frame: sf, fps, delay: 8, config: { damping: 13, stiffness: 100 } });
  const compExit = interpolate(sf, [48, 56], [1, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.in(Easing.quad),
  });
  const compVis = compEnter * compExit;

  // ── Stagger helper ──
  const stagger = (index: number) =>
    spring({ frame: sf, fps, delay: 10 + index * 3, config: { damping: 13, stiffness: 100 } }) * compExit;

  // ── Circle position & scale ──
  const cPos = circlePos(sf, si);
  const cSize = 48 + Math.sin(sf * 0.12) * 3;
  const cEnter = spring({ frame: sf, fps, delay: 0, config: { damping: 10, stiffness: 140 } });
  const cWipeOut = interpolate(sf, [54, 60], [1, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const cScale = cEnter * cWipeOut;

  // ── Trailing ghost circle ──
  const trailPos = circlePos(Math.max(0, sf - 6), si);

  // ── Wipe transition ──
  const wipeProgress = interpolate(sf, [54, 71], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.inOut(Easing.cubic),
  });
  const wipeOrigin = CK[si].exit;
  const maxDx = Math.max(wipeOrigin.x, W - wipeOrigin.x);
  const maxDy = Math.max(wipeOrigin.y, H - wipeOrigin.y);
  const maxR = Math.sqrt(maxDx * maxDx + maxDy * maxDy) + 40;

  return (
    <AbsoluteFill
      style={{
        backgroundColor: sc.bg,
        fontFamily: fonts.primary,
        overflow: 'hidden',
      }}
    >
      {/* ── Decorative dots ── */}
      {DOTS[si].map((dot, i) => {
        const dVis =
          spring({ frame: sf, fps, delay: dot.delay, config: { damping: 14 } }) * compExit;
        return (
          <div
            key={i}
            style={{
              position: 'absolute',
              left: dot.x - dot.size / 2,
              top: dot.y - dot.size / 2,
              width: dot.size,
              height: dot.size,
              borderRadius: '50%',
              backgroundColor: sc.circleColor,
              opacity: dVis * 0.2,
              transform: `scale(${dVis})`,
            }}
          />
        );
      })}

      {/* ── Component showcase (centered) ── */}
      <div
        style={{
          position: 'absolute',
          left: 0,
          top: 0,
          width: W,
          height: H,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {/* Scene 0 — Buttons */}
        {si === 0 && (() => {
          const btnStyles = [
            { bg: t.brandPrimary, fg: t.fgBrandOnPrimary },       // primary
            { bg: t.brandSecondary, fg: t.fgBrandOnSecondary },   // secondary
            { bg: t.backgroundSecondary, fg: t.fgBrandOnSecondary }, // tertiary
            { bg: t.dangerBg, fg: t.dangerFg },                   // alert
          ];
          return (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 18, alignItems: 'center' }}>
              {txt.buttons.map((label, i) => {
                const vis = stagger(i);
                const btn = btnStyles[i];
                return (
                  <div
                    key={label}
                    style={{
                      opacity: vis,
                      transform: `translateY(${(1 - vis) * 28}px) scale(${0.9 + vis * 0.1})`,
                    }}
                  >
                    <FakeButton label={label} bg={btn.bg} fg={btn.fg} radius={t.radiusButton} />
                  </div>
                );
              })}
            </div>
          );
        })()}

        {/* Scene 1 — Badges */}
        {si === 1 && (
          <div style={{ display: 'flex', gap: 14, justifyContent: 'center', flexWrap: 'wrap' }}>
            {[
              { label: txt.badges[0], bg: t.successBg, fg: t.successFg },
              { label: txt.badges[1], bg: t.dangerBg, fg: t.dangerFg },
              { label: txt.badges[2], bg: t.warningBg, fg: t.warningFg },
              { label: txt.badges[3], bg: t.promoteBg, fg: t.promoteFg },
              { label: txt.badges[4], bg: t.neutralBg, fg: t.neutralFg },
            ].map((b, i) => {
              const vis = stagger(i);
              return (
                <div
                  key={b.label}
                  style={{
                    opacity: vis,
                    transform: `translateY(${(1 - vis) * 24}px) scale(${0.9 + vis * 0.1})`,
                  }}
                >
                  <FakeBadge label={b.label} bg={b.bg} fg={b.fg} radius={t.radiusBadge} />
                </div>
              );
            })}
          </div>
        )}

        {/* Scene 2 — Card */}
        {si === 2 && (
          <div
            style={{
              opacity: compVis,
              transform: `translateY(${(1 - compVis) * 32}px) scale(${0.9 + compVis * 0.1})`,
            }}
          >
            <FakeCard t={t} sceneBg={sc.bg} title={txt.cardTitle} body={txt.cardBody} />
          </div>
        )}

        {/* Scene 3 — Toggle */}
        {si === 3 && (
          <div
            style={{
              opacity: compVis,
              transform: `scale(${0.85 + compVis * 0.15})`,
            }}
          >
            <FakeToggle t={t} fg={sc.fg} sf={sf} fps={fps} onLabel={txt.toggleOn} offLabel={txt.toggleOff} />
          </div>
        )}

        {/* Scene 4 — Chips */}
        {si === 4 && (
          <div style={{ display: 'flex', gap: 24, alignItems: 'center' }}>
            {[
              { label: txt.chips[0], selected: true },
              { label: txt.chips[1], selected: false },
              { label: txt.chips[2], selected: true },
            ].map((c, i) => {
              const vis = stagger(i);
              return (
                <div
                  key={c.label}
                  style={{
                    opacity: vis,
                    transform: `translateY(${(1 - vis) * 24}px) scale(${0.9 + vis * 0.1})`,
                  }}
                >
                  <FakeChip label={c.label} selected={c.selected} t={t} fg={sc.fg} />
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* ── Trailing ghost circle ── */}
      {cScale > 0.01 && (
        <div
          style={{
            position: 'absolute',
            left: trailPos.x - cSize * 0.65,
            top: trailPos.y - cSize * 0.65,
            width: cSize * 1.3,
            height: cSize * 1.3,
            borderRadius: '50%',
            backgroundColor: sc.circleColor,
            opacity: cScale * 0.12,
            transform: `scale(${cScale})`,
          }}
        />
      )}

      {/* ── Accent circle (the leading character) ── */}
      {cScale > 0.01 && (
        <div
          style={{
            position: 'absolute',
            left: cPos.x - cSize / 2,
            top: cPos.y - cSize / 2,
            width: cSize,
            height: cSize,
            borderRadius: '50%',
            backgroundColor: sc.circleColor,
            transform: `scale(${cScale})`,
            boxShadow: `0 0 28px 6px ${sc.circleColor}20`,
          }}
        />
      )}

      {/* ── Wipe circle (transition to next scene) ── */}
      {wipeProgress > 0 && (
        <div
          style={{
            position: 'absolute',
            left: 0,
            top: 0,
            width: W,
            height: H,
            backgroundColor: nextSc.bg,
            clipPath: `circle(${wipeProgress * maxR}px at ${wipeOrigin.x}px ${wipeOrigin.y}px)`,
          }}
        />
      )}
    </AbsoluteFill>
  );
};
