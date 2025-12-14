export interface Guest {
  name: string;
  phone: string;
  attending: 'yes' | 'no' | 'maybe';
  message: string;
}

export interface NavItem {
  label: string;
  to: string;
}

export interface MapLocation {
  title: string;
  address: string;
  mapEmbedUrl: string; // The src attribute from Google Maps Embed
}

export interface CoupleProfile {
  name: string;
  role: string; // Groom or Bride
  image: string;
}
