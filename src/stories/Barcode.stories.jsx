import React from 'react';

import Barcode from '../components/Barcode';

export default {
  title: 'Barcode',
  component: Barcode,
  name: 'Barcode',
};

// const Template = (args) => <Canvas {...args} />;
export function Default() {
  return (
    <div
      style={{
        width: 800,
        overflow: 'hidden',
        margin: 'auto',
        padding: 30,
        borderRadius: 16,
        height: 500,
        background: '#eaeaea',
        marginTop: 0,
      }}
    >
      <Barcode />
    </div>
  );
}
