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
        width: 500,
        overflow: 'hidden',
        margin: 'auto',
        padding: 30,
        borderRadius: 16,
        height: 300,
        background: '#eaeaea',
        marginTop: 0,
      }}
    >
      <Barcode
        onCancel={() => {
          console.log('I click the cancel button');
        }}
        onFound={(data) => {
          alert(data.barcode);
          console.log(data);
        }}
      />
    </div>
  );
}
