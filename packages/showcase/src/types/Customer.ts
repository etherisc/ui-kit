export interface Customer {
    id: string;
    name: string;
    email: string;
    company: string;
    status: 'active' | 'inactive' | 'pending';
    joinDate: string;
    lastActivity: string;
    totalOrders: number;
    totalValue: number;
} 