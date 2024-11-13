import api from './api';
import { io, Socket } from 'socket.io-client';

export interface Notification {
  id: string;
  userId: string;
  type: 'due_reminder' | 'overdue_notice' | 'reservation_confirmed' | 'system';
  message: string;
  read: boolean;
  createdAt: string;
}

class NotificationService {
  private socket: Socket | null = null;

  initializeSocket(userId: string) {
    this.socket = io(import.meta.env.VITE_WS_URL || 'http://localhost:3000', {
      auth: {
        token: localStorage.getItem('token'),
      },
    });

    this.socket.emit('joinUserRoom', userId);

    this.socket.on('connect', () => {
      console.log('Connected to notification service');
    });
  }

  async getNotifications(): Promise<Notification[]> {
    const response = await api.get('/notifications');
    return response.data.data.notifications;
  }

  async markAsRead(notificationId: string): Promise<void> {
    await api.patch(`/notifications/${notificationId}/read`);
  }

  async markAllAsRead(): Promise<void> {
    await api.patch('/notifications/read-all');
  }

  async updateNotificationPreferences(preferences: {
    emailNotifications: boolean;
    pushNotifications: boolean;
    dueReminders: boolean;
  }): Promise<void> {
    await api.patch('/users/notification-preferences', preferences);
  }

  onNewNotification(callback: (notification: Notification) => void) {
    this.socket?.on('newNotification', callback);
  }

  disconnect() {
    this.socket?.disconnect();
  }
}

export default new NotificationService();