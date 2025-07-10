'use client';

import { useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { Container, Box, Tabs, Tab } from '@mui/material';
import PaymentsDashboard from '../components/dashboard/PaymentsDashboard';
import CustomersDashboard from '../components/dashboard/CustomersDashboard';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ pt: 3 }}>{children}</Box>}
    </div>
  );
}

function Dashboard() {
  const searchParams = useSearchParams();
  const initialTab = searchParams.get('tab') === 'customers' ? 1 : 0;
  const [value, setValue] = useState(initialTab);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Container maxWidth="xl" sx={{ mt: 4 }}>
      <Box sx={{ width: '100%' }}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs value={value} onChange={handleChange} aria-label="dashboard tabs">
            <Tab label="Pagos" id="tab-0" />
            <Tab label="Clientes" id="tab-1" />
          </Tabs>
        </Box>
        <TabPanel value={value} index={0}>
          <PaymentsDashboard />
        </TabPanel>
        <TabPanel value={value} index={1}>
          <CustomersDashboard />
        </TabPanel>
      </Box>
    </Container>
  );
}

export default function HomePage() {
  return (
    <Suspense fallback={<div>Cargando...</div>}>
      <Dashboard />
    </Suspense>
  );
}