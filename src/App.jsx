import * as React from 'react';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import ProTip from './ProTip';
import Copyright from './Copyright';
import {Draw} from './Draw';
import { MuiFileInput } from 'mui-file-input'

export default function App() {
  const [file, setFile] = React.useState(null)
  const [shapes, setShapes] = React.useState([])

  const handleChange = React.useCallback((newFile) => {
    const reader = new FileReader();
    reader.onload = () => {
      const result = JSON.parse(JSON.parse(String(reader.result)));
      const shapes = result.children.filter(item => item.className !== 'Group');
      setShapes(shapes);
      console.log(`shapes - %o`, shapes);
    }
    reader.readAsText(newFile)
    setFile(newFile);
  },[]);

  return (
    <Container maxWidth="sm">
      <Box sx={{ my: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Material UI Vite.js example
        </Typography>
        <ProTip />
        <Copyright />
        <MuiFileInput value={file} onChange={handleChange} />
      </Box>
      <Box>

        <Draw shapes={shapes}/>
      </Box>

    </Container>
  );
}
