import api from './api';

export interface LateFee {
  id: string;
  userId: string;
  bookId: string;
  amount: number;
  daysLate: number;
  paid: boolean;
  createdAt: string;
}

class FeesService {
  async calculateLateFee(borrowingId: string): Promise<number> {
    const response = await api.get(`/fees/calculate/${borrowingId}`);
    return response.data.fee;
  }

  async getUserFees(): Promise<LateFee[]> {
    const response = await api.get('/fees/user');
    return response.data.fees;
  }

  async getAllFees(): Promise<LateFee[]> {
    const response = await api.get('/fees/all');
    return response.data.fees;
  }

  async payFee(feeId: string): Promise<void> {
    await api.post(`/fees/${feeId}/pay`);
  }

  async getDailyReport(): Promise<{
    totalFees: number;
    paidFees: number;
    unpaidFees: number;
  }> {
    const response = await api.get('/fees/daily-report');
    return response.data;
  }
}

export default new FeesService();