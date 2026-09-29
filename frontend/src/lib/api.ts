const BASE = (import.meta as any).env?.VITE_API_URL || 'http://localhost:8000';

export async function pollDocumentStatus(docId: string) {
  const token = localStorage.getItem('token');
  const res = await fetch(`${BASE}/api/v1/documents/${docId}/status`, {
    headers: token ? { Authorization: `Bearer ${token}` } : {},
  });
  if (!res.ok) throw new Error(`Status request failed: ${res.status}`);
  return { data: await res.json() };
}
