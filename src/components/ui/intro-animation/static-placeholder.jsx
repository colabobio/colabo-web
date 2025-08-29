import React from 'react';
import * as styles from './intro-animation.module.scss';

export function StaticPlaceholder() {
  return (
    <div className={styles.canvasWrap}>
      <div style={{ 
        width: '100%', 
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        <img
          src="/images/colabo-logo-v1.svg"
          alt="Colabo Logo"
          style={{
            width: '60%',
            maxHeight: '60%',
            objectFit: 'contain'
          }}
        />
      </div>
    </div>
  );
}

export default StaticPlaceholder;
