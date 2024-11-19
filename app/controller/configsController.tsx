import { API_ENDPOINTS } from "./api-endpoints";

export interface SavedAlarm {
  id: number;
  workEntry: string;
  intervalBeginning: string;
  intervalEnd: string;
  workEnd: string;
  workload: number;
  userId: number;
}

export class ConfigsController {
  static async worktimeAlarmConfig(
    token: string,
    dataIE: string,
    dataII: string,
    dataFI: string,
    dataFE: string,
    userId: number
  ): Promise<SavedAlarm> {
    let response = await fetch(API_ENDPOINTS.SAVED_ALARM_CONFIG, {
      method: "POST",
      headers: {
        Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        workEntry: dataIE,
        intervalBeginning: dataII,
        intervalEnd: dataFI,
        workEnd: dataFE,
        workload: 8,
        userId: userId,
      }),
    });

    return await response.json();
  }
}
