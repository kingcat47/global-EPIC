export interface EpicCoords {
  lat: number;
  lon: number;
}

export interface EpicAttitude {
  pitch: number;
  yaw: number;
  roll: number;
}

export interface EpicImage {
  identifier: string;
  caption: string;
  image: string;
  version: string;
  centroid_coordinates: EpicCoords;
  dscovr_j2000_position: { x: number; y: number; z: number };
  lunar_j2000_position: { x: number; y: number; z: number };
  sun_j2000_position: { x: number; y: number; z: number };
  attitude_quaternions: EpicAttitude;
  date: string;
  coords: {
    centroid_coordinates: EpicCoords;
    dscovr_j2000_position: { x: number; y: number; z: number };
    lunar_j2000_position: { x: number; y: number; z: number };
    sun_j2000_position: { x: number; y: number; z: number };
    attitude_quaternions: EpicAttitude;
  };
}

export interface EpicAvailableDate {
  date: string;
}
