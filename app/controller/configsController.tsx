import { CustomErrorMessage } from "@/constants/customTypes";
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

  static async updateWorktimeAlarmConfig(
    token: string,
    dataIE: string,
    dataII: string,
    dataFI: string,
    dataFE: string,
    userId: number
  ): Promise<SavedAlarm> {
    let response = await fetch(API_ENDPOINTS.SAVED_ALARM_CONFIG, {
      method: "PUT",
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

  static async findWorktimeAlarmConfig(token: string): Promise<SavedAlarm> {
    try {
      let response = await fetch(API_ENDPOINTS.SAVED_ALARM_CONFIG_BY_USER, {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        const errorData: CustomErrorMessage = await response.json();
        const errorMessage = errorData.errorMessage || `Error: ${response.status}`;
        throw new Error(errorMessage);
      }

      return await response.json();
    } catch (error) {
      console.error("Fetch data failed", error);
      throw error;
    }
  }
}
