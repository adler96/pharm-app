import { Box } from '@mui/material';
import './components/Pharmacie';
import Pharmacie from './components/Pharmacie';

function App() {
  return (
    <Box display="flex" flexDirection="column" gap={2}>
      <h1>PharmApp</h1>
      <Pharmacie />
    </Box>
  );
}

export default App;
