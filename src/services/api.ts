// Mock API service for frontend-only functionality
export const walletAPI = {
  getBalance: async () => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // Return mock wallet data
    return {
      balance: 250.00,
      coins: 125
    };
  }
};