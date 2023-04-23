//리뷰폼에서 흡연 등 토글버튼

import * as React from 'react';
import { memo } from 'react';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';

function ColorToggleButton() {
  console.log('colortogglebtn is rendered')
  const [alignment, setAlignment] = React.useState(1);
  // const [id,setId]=useState(null)
  const handleChange = (event, newAlignment) => {
    setAlignment(newAlignment);
  };
  return (
    <ToggleButtonGroup
      color="primary"
      value={alignment}
      exclusive
      onChange={handleChange}
      aria-label="Platform"
    >
      <ToggleButton value={1}>가능</ToggleButton>
      <ToggleButton value={0}>불가능</ToggleButton>
    </ToggleButtonGroup>
  );
}

export default memo(ColorToggleButton)