import { API_ENDPOINTS } from "@/app/controller/api-endpoints";
import { ConfigsController, SavedAlarm } from "@/app/controller/configsController";

global.fetch = jest.fn();

const mockSavedAlarm: SavedAlarm = {
  id: 1,
  workEntry: '08:00',
  intervalBeginning: '12:00',
  intervalEnd: '13:00',
  workEnd: '17:00',
  workload: 8,
  userId: 123,
};

describe('ConfigsController', () => {
  beforeEach(() => {
    (fetch as jest.Mock).mockClear();
  });

  describe('worktimeAlarmConfig', () => {
    it('should call fetch with correct parameters and return saved alarm', async () => {
      (fetch as jest.Mock).mockResolvedValueOnce({
        json: jest.fn().mockResolvedValueOnce(mockSavedAlarm),
      });

      const result = await ConfigsController.worktimeAlarmConfig(
        'token123',
        '08:00',
        '12:00',
        '13:00',
        '17:00',
        123
      );

      expect(fetch).toHaveBeenCalledWith(API_ENDPOINTS.SAVED_ALARM_CONFIG, expect.objectContaining({
        method: 'POST',
        headers: expect.objectContaining({
          Authorization: 'Bearer token123',
        }),
        body: JSON.stringify({
          workEntry: '08:00',
          intervalBeginning: '12:00',
          intervalEnd: '13:00',
          workEnd: '17:00',
          workload: 8,
          userId: 123,
        }),
      }));

      expect(result).toEqual(mockSavedAlarm);
    });
  });

  describe('updateWorktimeAlarmConfig', () => {
    it('should call fetch with correct parameters and return updated alarm', async () => {
      (fetch as jest.Mock).mockResolvedValueOnce({
        json: jest.fn().mockResolvedValueOnce(mockSavedAlarm),
      });

      const result = await ConfigsController.updateWorktimeAlarmConfig(
        'token123',
        '08:00',
        '12:00',
        '13:00',
        '17:00',
        123
      );

      expect(fetch).toHaveBeenCalledWith(API_ENDPOINTS.SAVED_ALARM_CONFIG, expect.objectContaining({
        method: 'PUT',
        headers: expect.objectContaining({
          Authorization: 'Bearer token123',
        }),
        body: JSON.stringify({
          workEntry: '08:00',
          intervalBeginning: '12:00',
          intervalEnd: '13:00',
          workEnd: '17:00',
          workload: 8,
          userId: 123,
        }),
      }));

      expect(result).toEqual(mockSavedAlarm);
    });
  });

  describe('findWorktimeAlarmConfig', () => {
    it('should call fetch with correct parameters and return found alarm', async () => {
      (fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: jest.fn().mockResolvedValueOnce(mockSavedAlarm),
      });

      const result = await ConfigsController.findWorktimeAlarmConfig('token123');

      expect(fetch).toHaveBeenCalledWith(API_ENDPOINTS.SAVED_ALARM_CONFIG_BY_USER, expect.objectContaining({
        method: 'GET',
        headers: expect.objectContaining({
          Authorization: 'Bearer token123',
        }),
      }));

      expect(result).toEqual(mockSavedAlarm);
    });

    it('should throw an error if the response is not ok', async () => {
      const errorMessage = 'Some error message';
      (fetch as jest.Mock).mockResolvedValueOnce({
        ok: false,
        json: jest.fn().mockResolvedValueOnce({ errorMessage }),
      });

      await expect(ConfigsController.findWorktimeAlarmConfig('token123')).rejects.toThrow(errorMessage);
    });
  });
});
