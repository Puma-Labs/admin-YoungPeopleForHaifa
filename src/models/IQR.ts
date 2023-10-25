export type QRStatus = "archived" | "hidden" | null;

export interface IQR {
  _id: string,
  title?: string,
  content?: string,
  svgURL?: string,
  sheetURL?: string,
  // date?: Date,
  // cover?: string,
  // content: string,
  // status?: QRStatus,
}

export type QRList = IQR[] | []

export type QRId = IQR['_id']

export type QRById = Record<QRId, IQR>

export type QRPayload = Omit<IQR, '_id'>
