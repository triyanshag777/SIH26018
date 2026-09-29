// 3D ULPIN = base 14-char parcel ULPIN + floor + unit suffix
const ANCHOR = { lat: 28.6692, lng: 77.4538 };
const M_PER_DEG = 111320;
const FLOOR_HEIGHT_M = 3;

function villageCode(village: string): string {
  const s = (village || 'XXXX').toUpperCase().replace(/[^A-Z0-9]/g, '');
  return (s + 'XXXX').slice(0, 4);
}

export function generateULPIN(
  village: string, parcelIdx: number, floorIdx: number, roomIdx: number
): string {
  const base = `UP${villageCode(village)}${String(parcelIdx).padStart(8, '0')}`;
  return `${base}-F${String(floorIdx).padStart(2, '0')}-U${String(roomIdx).padStart(2, '0')}`;
}

export function resolveCoordinates(x: number, z: number, floorIdx: number) {
  return {
    lat: ANCHOR.lat + z / M_PER_DEG,
    lng: ANCHOR.lng + x / (M_PER_DEG * Math.cos((ANCHOR.lat * Math.PI) / 180)),
    alt: floorIdx * FLOOR_HEIGHT_M,
  };
}

const RE = /^([A-Z]{2})([A-Z0-9]{4})(\d{8})-F(\d{2})-U(\d{2})$/;

export function validateULPIN(id: string): boolean {
  return RE.test((id || '').trim());
}

export function parseULPIN(id: string) {
  const m = RE.exec((id || '').trim());
  if (!m) return null;
  return {
    state: m[1], village: m[2], parcel: m[3],
    floor: parseInt(m[4], 10), unit: parseInt(m[5], 10),
  };
}
