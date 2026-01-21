import type { Meta, StoryObj } from '@storybook/react';
import { View, Text } from 'react-native';
import type { ColumnDef } from '@tanstack/react-table';

import {
  DataTable,
  DataTableToolbar,
  DataTableViewOptions,
  Badge,
  NeobrutalismThemeProvider,
} from 'react-native-neobrutalism';

// Sample data types
interface Payment {
  id: string;
  amount: number;
  status: 'pending' | 'processing' | 'success' | 'failed';
  email: string;
}

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  status: 'active' | 'inactive';
}

// Sample payment data
const payments: Payment[] = [
  { id: 'm5gr84i9', amount: 316, status: 'success', email: 'ken99@yahoo.com' },
  { id: '3u1reuv4', amount: 242, status: 'success', email: 'abe45@gmail.com' },
  { id: 'derv1ws0', amount: 837, status: 'processing', email: 'monserrat44@gmail.com' },
  { id: '5kma53ae', amount: 874, status: 'success', email: 'silas22@gmail.com' },
  { id: 'bhqecj4p', amount: 721, status: 'failed', email: 'carmella@hotmail.com' },
  { id: 'p0iq1234', amount: 150, status: 'pending', email: 'test@example.com' },
  { id: 'z9xc5678', amount: 425, status: 'success', email: 'john@example.com' },
  { id: 'n3bg9012', amount: 999, status: 'processing', email: 'jane@example.com' },
  { id: 'k7hy3456', amount: 225, status: 'failed', email: 'bob@example.com' },
  { id: 'w2jk7890', amount: 650, status: 'success', email: 'alice@example.com' },
  { id: 'r5ty1234', amount: 180, status: 'pending', email: 'charlie@example.com' },
  { id: 't8ui5678', amount: 575, status: 'success', email: 'diana@example.com' },
];

// Sample user data
const users: User[] = [
  { id: '1', name: 'John Doe', email: 'john@example.com', role: 'Admin', status: 'active' },
  { id: '2', name: 'Jane Smith', email: 'jane@example.com', role: 'User', status: 'active' },
  { id: '3', name: 'Bob Wilson', email: 'bob@example.com', role: 'Editor', status: 'inactive' },
  { id: '4', name: 'Alice Brown', email: 'alice@example.com', role: 'User', status: 'active' },
  { id: '5', name: 'Charlie Davis', email: 'charlie@example.com', role: 'Viewer', status: 'inactive' },
];

const meta: Meta<typeof DataTable> = {
  title: 'Data Display/DataTable',
  component: DataTable,
  decorators: [
    (Story) => (
      <NeobrutalismThemeProvider>
        <View style={{ padding: 20 }}>
          <Story />
        </View>
      </NeobrutalismThemeProvider>
    ),
  ],
};

export default meta;

type Story = StoryObj<typeof DataTable>;

// Payment columns
const paymentColumns: ColumnDef<Payment>[] = [
  {
    accessorKey: 'status',
    header: 'Status',
    cell: ({ row }: { row: { getValue: (key: string) => Payment['status'] } }) => {
      const status = row.getValue('status');
      const variant =
        status === 'success'
          ? 'success'
          : status === 'processing'
            ? 'warning'
            : 'danger';
      return <Badge variant={variant}>{status}</Badge>;
    },
  },
  {
    accessorKey: 'email',
    header: 'Email',
  },
  {
    accessorKey: 'amount',
    header: 'Amount',
    cell: ({ row }: { row: { getValue: (key: string) => number } }) => {
      const amount = row.getValue('amount');
      const formatted = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
      }).format(amount);
      return <Text style={{ fontWeight: '600' }}>{formatted}</Text>;
    },
  },
];

// User columns
const userColumns: ColumnDef<User>[] = [
  {
    accessorKey: 'name',
    header: 'Name',
  },
  {
    accessorKey: 'email',
    header: 'Email',
  },
  {
    accessorKey: 'role',
    header: 'Role',
  },
  {
    accessorKey: 'status',
    header: 'Status',
    cell: ({ row }: { row: { getValue: (key: string) => User['status'] } }) => {
      const status = row.getValue('status');
      return (
        <Badge variant={status === 'active' ? 'success' : 'neutral'}>
          {status}
        </Badge>
      );
    },
  },
];

// Default
export const Default: Story = {
  render: () => (
    <DataTable
      columns={paymentColumns}
      data={payments.slice(0, 5)}
    />
  ),
};

// With Sorting
export const WithSorting: Story = {
  render: () => (
    <DataTable
      columns={paymentColumns}
      data={payments.slice(0, 5)}
      enableSorting
    />
  ),
};

// With Pagination
export const WithPagination: Story = {
  render: () => (
    <DataTable
      columns={paymentColumns}
      data={payments}
      enablePagination
      pageSize={5}
      pageSizeOptions={[5, 10, 20]}
    />
  ),
};

// With Row Selection
export const WithRowSelection: Story = {
  render: function SelectionExample() {
    return (
      <DataTable
        columns={paymentColumns}
        data={payments.slice(0, 5)}
        enableRowSelection
      />
    );
  },
};

// Full Featured
export const FullFeatured: Story = {
  render: function FullFeaturedExample() {
    return (
      <DataTable
        columns={paymentColumns}
        data={payments}
        enableSorting
        enablePagination
        enableRowSelection
        pageSize={5}
        renderToolbar={(table) => (
          <View style={{ flexDirection: 'row', gap: 16, marginBottom: 16 }}>
            <DataTableToolbar
              table={table}
              filterColumn="email"
              filterPlaceholder="Filter emails..."
            />
            <DataTableViewOptions table={table} />
          </View>
        )}
      />
    );
  },
};

// User Table Example
export const UserTable: Story = {
  render: () => (
    <DataTable
      columns={userColumns}
      data={users}
      enableSorting
      enableRowSelection
    />
  ),
};

// Empty State
export const EmptyState: Story = {
  render: () => (
    <DataTable
      columns={paymentColumns}
      data={[]}
      renderEmpty={() => (
        <View style={{ padding: 32, alignItems: 'center' }}>
          <Text style={{ fontSize: 16, fontWeight: '600' }}>No payments found</Text>
          <Text style={{ color: '#666', marginTop: 8 }}>
            Try adjusting your filters or add a new payment.
          </Text>
        </View>
      )}
    />
  ),
};

// Without Shadow
export const NoShadow: Story = {
  render: () => (
    <DataTable
      columns={paymentColumns}
      data={payments.slice(0, 3)}
      shadowStyle={null}
    />
  ),
};

// Custom Theme
export const CustomTheme: Story = {
  decorators: [
    (Story) => (
      <NeobrutalismThemeProvider
        theme={{
          shadow: { offsetX: 6, offsetY: 6, color: '#333333' },
          colors: {
            primary: '#6366F1',
            primaryForeground: '#FFFFFF',
            background: '#EEF2FF',
            secondary: '#E0E7FF',
          },
          border: { radius: 12 },
        }}
      >
        <View style={{ padding: 20 }}>
          <Story />
        </View>
      </NeobrutalismThemeProvider>
    ),
  ],
  render: () => (
    <DataTable
      columns={paymentColumns}
      data={payments.slice(0, 5)}
      enableSorting
      enablePagination
    />
  ),
};
