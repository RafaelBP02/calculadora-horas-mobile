import React from "react";
import { API_ENDPOINTS } from "./api-endpoints";
import { CustomUser } from "../models/userModel";

export class AdministrationController {
  static async listAllUsers(token: string): Promise<CustomUser[]> {
    try {
      let response = await fetch(API_ENDPOINTS.ADMIN_ALL_USERS, {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.log("Fetch data failed", error);
      throw error;
    }
  }

  static async updateUser(token: string, userID: number, newWorkplace: string) {
    let response = await fetch(API_ENDPOINTS.ADMIN_UPDATE_USER, {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({//formato esperado pelo SBD
        id: userID,
        eMail: "N/A",
        name: "N/A",
        surename: "N/A",
        workplace: newWorkplace,
        role: {
          id: 0,
          roleName: "N/A",
          details: "N/A",
        },
      }),
    });

    return await response.json();
  }
}
