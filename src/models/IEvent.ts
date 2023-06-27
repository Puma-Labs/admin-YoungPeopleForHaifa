export type EventStatus = "archived" | "hidden" | null;

export interface IEvent {
  _id?: string,
  title: string,
  place: string,
  date?: Date,
  cover?: string,
  text: string,
  status?: EventStatus,
}
