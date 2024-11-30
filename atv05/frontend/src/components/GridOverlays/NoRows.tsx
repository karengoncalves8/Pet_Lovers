import {  GridOverlay } from '@mui/x-data-grid';

export default function NoRows() {

  return (
    <GridOverlay>
        <p style={{ marginTop: 60 }}>Nenhum cliente encontrado.</p>
    </GridOverlay>
  );
}