import { useCallback, useEffect, useRef, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { fetchAllTypes } from '../api/typeService';
import { useFilterStore } from '../store/filterStore';
import { TYPE_STYLES } from '../utils/typeColors';

const hexToRgb = (hex: string) => {
  const r = parseInt(hex.slice(1,3),16);
  const g = parseInt(hex.slice(3,5),16);
  const b = parseInt(hex.slice(5,7),16);
  return `${r},${g},${b}`;
};

export default function FilterPanel() {
  const { selectedType, setType } = useFilterStore();
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  const { data: types = [] } = useQuery({
    queryKey: ['types'],
    queryFn:  fetchAllTypes,
    staleTime: Infinity,
  });

  const checkScroll = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 4);
    setCanScrollRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 4);
  }, []);

  useEffect(() => {
    checkScroll();
    window.addEventListener('resize', checkScroll);
    return () => window.removeEventListener('resize', checkScroll);
  }, [checkScroll, types]);

  const scroll = (dir: 'left' | 'right') => {
    scrollRef.current?.scrollBy({
      left: dir === 'left' ? -200 : 200,
      behavior: 'smooth',
    });
  };

  return (
    <div style={{ position: 'relative' }}>
      {/* Left fade + arrow */}
      {canScrollLeft && (
        <button
          onClick={() => scroll('left')}
          aria-label="Scroll left"
          style={{
            position: 'absolute', left: 0, top: 0, bottom: 0,
            width: 40, zIndex: 2, border: 'none', cursor: 'pointer',
            background: 'linear-gradient(to right, rgba(10,10,15,0.95) 30%, transparent)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            color: 'rgba(255,255,255,0.6)', fontSize: 14,
          }}
        >
          ‹
        </button>
      )}

      {/* Right fade + arrow */}
      {canScrollRight && (
        <button
          onClick={() => scroll('right')}
          aria-label="Scroll right"
          style={{
            position: 'absolute', right: 0, top: 0, bottom: 0,
            width: 40, zIndex: 2, border: 'none', cursor: 'pointer',
            background: 'linear-gradient(to left, rgba(10,10,15,0.95) 30%, transparent)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            color: 'rgba(255,255,255,0.6)', fontSize: 14,
          }}
        >
          ›
        </button>
      )}

      {/* Scrollable row */}
      <div
        ref={scrollRef}
        onScroll={checkScroll}
        style={{
          display: 'flex',
          gap: 8,
          overflowX: 'auto',
          paddingBottom: 4,
          scrollbarWidth: 'thin',
          scrollbarColor: 'rgba(255,255,255,0.15) transparent',
        }}
      >
        {/* All button */}
        <button
          onClick={() => setType('')}
          style={{
            flexShrink: 0,
            padding: '6px 16px',
            borderRadius: 12,
            fontSize: 12,
            fontWeight: 600,
            cursor: 'pointer',
            transition: 'all 0.2s',
            border: '1px solid',
            background:   selectedType === '' ? '#fff' : 'transparent',
            color:        selectedType === '' ? '#0a0a0f' : 'rgba(255,255,255,0.4)',
            borderColor:  selectedType === '' ? '#fff' : 'rgba(255,255,255,0.15)',
          }}
        >
          All
        </button>

        {types.map(type => {
          const st     = TYPE_STYLES[type];
          const accent = st?.accent ?? '#888780';
          const rgb    = hexToRgb(accent.startsWith('#') ? accent : '#888780');
          const active = selectedType === type;

          return (
            <button
              key={type}
              onClick={() => setType(active ? '' : type)}
              style={{
                flexShrink:  0,
                padding:     '6px 14px',
                borderRadius: 12,
                fontSize:    11,
                fontWeight:  600,
                textTransform: 'capitalize',
                cursor:      'pointer',
                transition:  'all 0.2s',
                border:      '1px solid',
                background:  active ? `rgba(${rgb},0.2)` : 'transparent',
                color:       active ? accent : 'rgba(255,255,255,0.4)',
                borderColor: active ? accent  : 'rgba(255,255,255,0.12)',
              }}
              onMouseEnter={e => {
                if (!active) {
                  const el = e.currentTarget as HTMLElement;
                  el.style.color       = accent;
                  el.style.borderColor = accent;
                  el.style.background  = `rgba(${rgb},0.12)`;
                }
              }}
              onMouseLeave={e => {
                if (!active) {
                  const el = e.currentTarget as HTMLElement;
                  el.style.color       = 'rgba(255,255,255,0.4)';
                  el.style.borderColor = 'rgba(255,255,255,0.12)';
                  el.style.background  = 'transparent';
                }
              }}
            >
              {type}
            </button>
          );
        })}
      </div>

      <style>{`
        div::-webkit-scrollbar { height: 4px; }
        div::-webkit-scrollbar-track { background: transparent; }
        div::-webkit-scrollbar-thumb {
          background: rgba(255,255,255,0.15);
          border-radius: 4px;
        }
        div::-webkit-scrollbar-thumb:hover {
          background: rgba(255,255,255,0.25);
        }
      `}</style>
    </div>
  );
}