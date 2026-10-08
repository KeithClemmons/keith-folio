const drops = Array.from({ length: 42 }, (_, index) => ({
  left: `${(index * 47) % 100}%`,
  delay: `${(index % 14) * 0.45}s`,
  duration: `${4.2 + (index % 8) * 0.85}s`,
  height: 14 + (index % 6) * 7,
  pink: index % 3 === 0,
}));

export function Atmosphere() {
  return (
    <div className="atmosphere" aria-hidden="true">
      <svg className="svg-defs" width="0" height="0">
        <filter id="cloud-soft" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="6" />
        </filter>
      </svg>

      <div className="cloud-field">
        <Cloud className="cloud cloud-a" />
        <Cloud className="cloud cloud-b" />
        <Cloud className="cloud cloud-c" />
        <Cloud className="cloud cloud-d" />
      </div>

      <div className="rain">
        {drops.map((drop, index) => (
          <span
            key={index}
            className={drop.pink ? "drop drop-blue" : "drop"}
            style={{
              left: drop.left,
              height: drop.height,
              animationDelay: drop.delay,
              animationDuration: drop.duration,
            }}
          />
        ))}
      </div>
    </div>
  );
}

function Cloud({ className }: { className: string }) {
  return (
    <svg className={className} viewBox="0 0 220 90" fill="none">
      <g filter="url(#cloud-soft)" fill="#ffffff">
        <ellipse cx="78" cy="52" rx="58" ry="24" />
        <ellipse cx="118" cy="40" rx="46" ry="28" />
        <ellipse cx="150" cy="52" rx="40" ry="20" />
        <ellipse cx="48" cy="56" rx="28" ry="16" />
      </g>
    </svg>
  );
}

export function StormStage() {
  return (
    <div className="storm-stage" aria-hidden="true">
      <div className="storm-cloud storm-cloud-1">
        <Cloud className="h-full w-full" />
      </div>
      <div className="storm-cloud storm-cloud-2">
        <Cloud className="h-full w-full" />
      </div>
      <div className="storm-cloud storm-cloud-3">
        <Cloud className="h-full w-full" />
      </div>
    </div>
  );
}

const paperLayers = [
  {
    fill: "#0e3c70",
    d: "M-40,260 C0,250 100,240 160,210 C210,180 260,80 350,65 C430,52 490,140 450,210 C420,260 320,275 300,215 C285,175 370,150 440,195 C500,235 560,255 620,248 C660,250 640,240 700,210 C750,180 800,80 890,65 C970,52 1030,140 990,210 C960,260 860,275 840,215 C825,175 910,150 980,195 C1040,235 1100,255 1160,248 C1200,250 1140,240 1200,210 C1250,180 1300,80 1390,65 C1470,52 1530,140 1490,210 C1460,260 1360,275 1340,215 C1325,175 1410,150 1480,195 C1540,235 1600,255 1660,248 C1740,240 1500,230 1520,240 L1520,560 L-40,560 Z",
  },
  {
    fill: "#17629f",
    d: "M-40,305 C0,295 -40,285 20,255 C70,225 120,125 210,110 C290,97 350,185 310,255 C280,305 180,320 160,260 C145,220 230,195 300,240 C360,280 420,300 480,293 C520,295 440,285 500,255 C550,225 600,125 690,110 C770,97 830,185 790,255 C760,305 660,320 640,260 C625,220 710,195 780,240 C840,280 900,300 960,293 C1000,295 920,285 980,255 C1030,225 1080,125 1170,110 C1250,97 1310,185 1270,255 C1240,305 1140,320 1120,260 C1105,220 1190,195 1260,240 C1320,280 1380,300 1440,293 C1520,285 1500,275 1520,285 L1520,560 L-40,560 Z",
  },
  {
    fill: "#1f84c6",
    d: "M-40,348 C0,338 220,328 280,298 C330,268 380,168 470,153 C550,140 610,228 570,298 C540,348 440,363 420,303 C405,263 490,238 560,283 C620,323 680,343 740,336 C780,338 780,328 840,298 C890,268 940,168 1030,153 C1110,140 1170,228 1130,298 C1100,348 1000,363 980,303 C965,263 1050,238 1120,283 C1180,323 1240,343 1300,336 C1380,328 1500,318 1520,328 L1520,560 L-40,560 Z",
  },
  {
    fill: "#4eabd8",
    d: "M-40,388 C0,378 40,368 100,338 C150,308 200,208 290,193 C370,180 430,268 390,338 C360,388 260,403 240,343 C225,303 310,278 380,323 C440,363 500,383 560,376 C600,378 580,368 640,338 C690,308 740,208 830,193 C910,180 970,268 930,338 C900,388 800,403 780,343 C765,303 850,278 920,323 C980,363 1040,383 1100,376 C1140,378 1100,368 1160,338 C1210,308 1260,208 1350,193 C1430,180 1490,268 1450,338 C1420,388 1320,403 1300,343 C1285,303 1370,278 1440,323 C1500,363 1560,383 1620,376 C1700,368 1500,358 1520,368 L1520,560 L-40,560 Z",
  },
  {
    fill: "#9fd4ea",
    d: "M-40,428 C0,418 340,408 400,378 C450,348 500,248 590,233 C670,220 730,308 690,378 C660,428 560,443 540,383 C525,343 610,318 680,363 C740,403 800,423 860,416 C900,418 860,408 920,378 C970,348 1020,248 1110,233 C1190,220 1250,308 1210,378 C1180,428 1080,443 1060,383 C1045,343 1130,318 1200,363 C1260,403 1320,423 1380,416 C1460,408 1500,398 1520,408 L1520,560 L-40,560 Z",
  },
] as const;

const paperLips = [
  { fill: "#f6f1e8", d: "M320,80 C390,55 460,110 430,160 C410,120 360,100 320,80 Z" },
  { fill: "#0a2c52", d: "M310,190 C360,220 430,210 410,160 C380,200 330,210 310,190 Z" },
  { fill: "#f6f1e8", d: "M860,80 C930,55 1000,110 970,160 C950,120 900,100 860,80 Z" },
  { fill: "#0a2c52", d: "M850,190 C900,220 970,210 950,160 C920,200 870,210 850,190 Z" },
  { fill: "#f6f1e8", d: "M1360,80 C1430,55 1500,110 1470,160 C1450,120 1400,100 1360,80 Z" },
  { fill: "#0a2c52", d: "M1350,190 C1400,220 1470,210 1450,160 C1420,200 1370,210 1350,190 Z" },
  { fill: "#f6f1e8", d: "M180,125 C250,100 320,155 290,205 C270,165 220,145 180,125 Z" },
  { fill: "#0a2c52", d: "M170,235 C220,265 290,255 270,205 C240,245 190,255 170,235 Z" },
  { fill: "#f6f1e8", d: "M660,125 C730,100 800,155 770,205 C750,165 700,145 660,125 Z" },
  { fill: "#0a2c52", d: "M650,235 C700,265 770,255 750,205 C720,245 670,255 650,235 Z" },
  { fill: "#f6f1e8", d: "M1140,125 C1210,100 1280,155 1250,205 C1230,165 1180,145 1140,125 Z" },
  { fill: "#0a2c52", d: "M1130,235 C1180,265 1250,255 1230,205 C1200,245 1150,255 1130,235 Z" },
  { fill: "#f6f1e8", d: "M440,168 C510,143 580,198 550,248 C530,208 480,188 440,168 Z" },
  { fill: "#0a2c52", d: "M430,278 C480,308 550,298 530,248 C500,288 450,298 430,278 Z" },
  { fill: "#f6f1e8", d: "M1000,168 C1070,143 1140,198 1110,248 C1090,208 1040,188 1000,168 Z" },
  { fill: "#0a2c52", d: "M990,278 C1040,308 1110,298 1090,248 C1060,288 1010,298 990,278 Z" },
] as const;

export function PaperWaves() {
  return (
    <div className="paper-waves" aria-hidden="true">
      <svg viewBox="0 0 1440 480" preserveAspectRatio="xMidYMax slice">
        <g transform="translate(0 480) scale(1 0.62) translate(0 -480)">
        {paperLayers.map((layer) => (
          <path key={layer.fill + layer.d.slice(0, 24)} className="paper-sheet" fill={layer.fill} d={layer.d} />
        ))}
        {paperLips.map((lip) => (
          <path key={lip.d} className="paper-foam" fill={lip.fill} d={lip.d} />
        ))}
        </g>
      </svg>
    </div>
  );
}
