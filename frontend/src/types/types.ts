export interface SeismicEvent {
  id: string;
  externalId?: string;
  occurredAt: string;
  latitude: number;
  longitude: number;
  magnitude: number;
  magnitudeType: string;
  depthKm: number;
  place: string;
  source: string;
  reviewStatus: string;
}

export interface DashboardSummary {
  totalEvents24h: number;
  maxMagnitude: number;
  activeSources: number;
  activeAlerts: number;
}