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
      console.error("Fetch data failed", error);
      throw error;
    }
  }
}
