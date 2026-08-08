export default function Avatar({ size = 300 }) {
  return (
    <svg
      viewBox="0 0 320 372"
      width={size}
      height={size * 1.1625}
      role="img"
      aria-label="Kavad Rushi illustration"
    >
      <defs>
        <linearGradient id="aBg" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#0d9488" />
          <stop offset="55%" stopColor="#0ea5e9" />
          <stop offset="100%" stopColor="#2563eb" />
        </linearGradient>
        <radialGradient id="aGlow" cx="0.5" cy="0.42" r="0.75">
          <stop offset="0%" stopColor="rgba(34,211,238,0.30)" />
          <stop offset="100%" stopColor="rgba(14,165,233,0)" />
        </radialGradient>
        <radialGradient id="aHair" cx="0.5" cy="0.25" r="0.9">
          <stop offset="0%" stopColor="#374151" />
          <stop offset="55%" stopColor="#1f2937" />
          <stop offset="100%" stopColor="#111827" />
        </radialGradient>
        <linearGradient id="aSkin" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#fcd9a8" />
          <stop offset="100%" stopColor="#e8ab74" />
        </linearGradient>
        <linearGradient id="aJacket" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#0f766e" />
          <stop offset="100%" stopColor="#115e59" />
        </linearGradient>
        <linearGradient id="aShirt" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#ffffff" />
          <stop offset="100%" stopColor="#cbd5e1" />
        </linearGradient>
      </defs>

      {/* Backdrop */}
      <circle cx="160" cy="186" r="146" fill="url(#aGlow)" />
      <circle cx="160" cy="186" r="134" fill="none" stroke="#14b8a6" strokeWidth="2" strokeDasharray="3 9" opacity="0.5" />
      <circle cx="160" cy="186" r="106" fill="url(#aBg)" opacity="0.32" />

      {/* Shoulders / jacket */}
      <path
        d="M160 150 C122 162 86 192 70 242 L52 366 C56 372 62 372 66 368
           L120 342 L160 332 L200 342 L254 368 C258 372 264 372 268 368
           L250 242 C234 192 198 162 160 150 Z"
        fill="url(#aJacket)"
      />
      {/* Lapel */}
      <path d="M160 150 L122 222 L160 246 L198 222 Z" fill="#0b3b36" opacity="0.45" />
      <path d="M160 150 L114 226 L122 232 Z" fill="#0f2a28" opacity="0.6" />
      <path d="M160 150 L206 226 L198 232 Z" fill="#0f2a28" opacity="0.6" />

      {/* Shirt + tie */}
      <path d="M160 296 L138 330 L160 350 L182 330 Z" fill="url(#aShirt)" />
      <path d="M160 296 L160 372" stroke="#fbbf24" strokeWidth="6.5" />
      <path d="M160 296 L151 310 M160 296 L169 310" stroke="#fbbf24" strokeWidth="4.5" />

      {/* Buttons */}
      <circle cx="160" cy="222" r="3.5" fill="#5eead4" opacity="0.9" />
      <circle cx="160" cy="250" r="3.5" fill="#5eead4" opacity="0.75" />

      {/* Neck */}
      <rect x="140" y="128" width="40" height="50" rx="14" fill="url(#aSkin)" />
      <path d="M178 178 L178 132 Q170 124 160 126 L160 178 Z" fill="#d1925e" opacity="0.55" />

      {/* Ears */}
      <ellipse cx="94" cy="142" rx="12.5" ry="19" fill="url(#aSkin)" />
      <ellipse cx="226" cy="142" rx="12.5" ry="19" fill="url(#aSkin)" />
      <path d="M94 130 q5 1.5 0 7 M94 148 q5 1 0 8" stroke="#d1925e" strokeWidth="2.4" fill="none" strokeLinecap="round" opacity="0.7" />

      {/* Head base */}
      <ellipse cx="160" cy="128" rx="72" ry="78" fill="url(#aSkin)" />

      {/* Face shaping: cheekbone + jaw highlight */}
      <ellipse cx="120" cy="172" rx="34" ry="15" fill="#f6c38c" opacity="0.5" />
      <ellipse cx="200" cy="172" rx="34" ry="15" fill="#f6c38c" opacity="0.5" />
      <path d="M90 152 Q150 240 160 238 Q170 240 230 152 L230 154 Q178 228 160 228 Q142 228 90 154 Z" fill="#d1925e" opacity="0.28" />
      {/* soft top light */}
      <ellipse cx="142" cy="96" rx="46" ry="28" fill="#ffe3bc" opacity="0.45" />

      {/* Hair with modern crop */}
      <path
        d="M84 148 C78 88 114 56 160 56 C206 54 246 92 240 152
           C238 166 222 174 210 170 L208 116 C188 84 122 82 110 118 L104 166
           C92 172 86 162 88 148 Z"
        fill="url(#aHair)"
      />
      {/* Textured fringe */}
      <path d="M96 130 C90 92 118 60 160 58 L160 64 C120 66 98 92 102 124 Z" fill="#111827" opacity="0.6" />
      <path d="M104 102 Q150 78 210 96" stroke="#4b5563" strokeWidth="5" fill="none" strokeLinecap="round" opacity="0.85" />
      <path d="M100 122 Q145 96 218 116" stroke="#6b7280" strokeWidth="3.6" fill="none" strokeLinecap="round" opacity="0.55" />
      <path d="M206 100 Q230 122 236 144" stroke="#1f2937" strokeWidth="4" fill="none" strokeLinecap="round" opacity="0.5" />
      {/* side fade */}
      <path d="M96 128 q-4 22 6 40" stroke="#111827" strokeWidth="7" fill="none" strokeLinecap="round" opacity="0.35" />
      <path d="M226 126 q4 22 -6 40" stroke="#111827" strokeWidth="7" fill="none" strokeLinecap="round" opacity="0.35" />

      {/* Eyebrows */}
      <path d="M118 136 Q138 126 152 134" stroke="#3f2d20" strokeWidth="4.6" fill="none" strokeLinecap="round" />
      <path d="M168 134 Q182 126 202 136" stroke="#3f2d20" strokeWidth="4.6" fill="none" strokeLinecap="round" />

      {/* Eyes */}
      <ellipse cx="132" cy="148" rx="10.5" ry="11.5" fill="#ffffff" />
      <ellipse cx="188" cy="148" rx="10.5" ry="11.5" fill="#ffffff" />
      <circle cx="133" cy="149" r="5.8" fill="#0f172a" />
      <circle cx="187" cy="149" r="5.8" fill="#0f172a" />
      <circle cx="135.4" cy="146.5" r="1.9" fill="#ffffff" />
      <circle cx="189.4" cy="146.5" r="1.9" fill="#ffffff" />
      <path d="M120 140 Q131 140 140 143" stroke="#3f2d20" strokeWidth="1.8" fill="none" strokeLinecap="round" opacity="0.6" />
      <path d="M180 143 Q189 140 200 140" stroke="#3f2d20" strokeWidth="1.8" fill="none" strokeLinecap="round" opacity="0.6" />

      {/* Nose */}
      <path d="M160 128 L157 160 Q156 172 160 176 Q164 172 163 160 L160 128 Z" fill="#d1925e" opacity="0.35" />
      <path d="M156 166 Q160 171 164 166" stroke="#c48654" strokeWidth="2.6" fill="none" strokeLinecap="round" opacity="0.85" />

      {/* Smile */}
      <path d="M138 186 Q160 204 182 186" stroke="#8a4330" strokeWidth="4.4" fill="none" strokeLinecap="round" />
      <path d="M148 191 Q160 200 172 191" stroke="#c47754" strokeWidth="2.2" fill="none" strokeLinecap="round" opacity="0.5" />

      {/* Smile dimples */}
      <ellipse cx="132" cy="190" rx="3" ry="1.8" fill="#d1925e" opacity="0.5" />
      <ellipse cx="188" cy="190" rx="3" ry="1.8" fill="#d1925e" opacity="0.5" />
    </svg>
  );
}