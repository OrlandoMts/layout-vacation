export interface UserItf {
  name: string;
  numberEmployee: number;
  daysAvailble: number;
  period: string;
  dateEnd: Date;
}

export interface BaseRangeDate {
  from: string;
  to: string;
}

export interface RequestItf {
  days: number;
  dayStart: string;
  dayEnd: string;
  comment?: string;
  type?: string;
  midday?: boolean;
}
