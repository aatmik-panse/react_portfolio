import RfcPage from './rfc/RfcPage';
import GalleryPage from './rfc/GalleryPage';

export function isGalleryPath(path: string): boolean {
  return path.replace(/\/+$/, '') === '/gallery';
}

export default function App({ path }: { path?: string }) {
  const current = path ?? (typeof window === 'undefined' ? '/' : window.location.pathname);
  return isGalleryPath(current) ? <GalleryPage /> : <RfcPage />;
}
